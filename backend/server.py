from fastapi import FastAPI, APIRouter, Header, HTTPException, Query
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import io
import csv
import re
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', '')

app = FastAPI()
api_router = APIRouter(prefix="/api")


def verify_admin(x_admin_password: str = Header(None)):
    if not x_admin_password or x_admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Unauthorized")


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')


# Models
class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str = ""
    phone: str
    service_interest: str = "website"
    message: str = ""
    source: str = "landing_page"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class LeadCreate(BaseModel):
    name: str
    email: str = ""
    phone: str
    service_interest: str = "website"
    message: str = ""
    source: str = "landing_page"

class AnalyticsEvent(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_type: str
    section: str = ""
    metadata: dict = {}
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class AnalyticsEventCreate(BaseModel):
    event_type: str
    section: str = ""
    metadata: dict = {}

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str = ""
    excerpt: str = ""
    content: str = ""
    cover_image: str = ""
    tags: List[str] = []
    author: str = "Chetna AI Studio"
    published: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str = ""
    content: str = ""
    cover_image: str = ""
    tags: List[str] = []
    author: str = "Chetna AI Studio"
    published: bool = False

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[List[str]] = None
    author: Optional[str] = None
    published: Optional[bool] = None


# ── Public Routes ──

@api_router.get("/")
async def root():
    return {"message": "Chetna AI Studio API"}

@api_router.post("/leads", response_model=Lead)
async def create_lead(input_data: LeadCreate):
    lead = Lead(**input_data.model_dump())
    doc = lead.model_dump()
    await db.leads.insert_one(doc)
    return lead

@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    leads = await db.leads.find({}, {"_id": 0}).to_list(1000)
    return leads

@api_router.post("/analytics", response_model=AnalyticsEvent)
async def track_event(input_data: AnalyticsEventCreate):
    event = AnalyticsEvent(**input_data.model_dump())
    doc = event.model_dump()
    await db.analytics.insert_one(doc)
    return event

@api_router.get("/analytics/summary")
async def get_analytics_summary():
    total_leads = await db.leads.count_documents({})
    total_events = await db.analytics.count_documents({})
    pipeline = [{"$group": {"_id": "$event_type", "count": {"$sum": 1}}}]
    event_counts = {}
    async for doc in db.analytics.aggregate(pipeline):
        event_counts[doc["_id"]] = doc["count"]
    service_pipeline = [{"$group": {"_id": "$service_interest", "count": {"$sum": 1}}}]
    service_counts = {}
    async for doc in db.leads.aggregate(service_pipeline):
        service_counts[doc["_id"]] = doc["count"]
    return {
        "total_leads": total_leads,
        "total_events": total_events,
        "event_breakdown": event_counts,
        "service_breakdown": service_counts,
    }

# ── Public Blog Routes ──

@api_router.get("/blog", response_model=List[BlogPost])
async def get_published_posts(tag: Optional[str] = None):
    query = {"published": True}
    if tag:
        query["tags"] = tag
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_post_by_slug(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


# ── Admin Auth ──

@api_router.post("/admin/auth")
async def admin_auth(x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    return {"authenticated": True}


# ── Admin Leads ──

@api_router.get("/admin/leads")
async def admin_get_leads(
    x_admin_password: str = Header(None),
    service: Optional[str] = None,
    search: Optional[str] = None,
    sort_by: str = "created_at",
    sort_order: int = -1,
    skip: int = 0,
    limit: int = 50,
):
    verify_admin(x_admin_password)
    query = {}
    if service:
        query["service_interest"] = service
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}},
            {"phone": {"$regex": search, "$options": "i"}},
        ]
    total = await db.leads.count_documents(query)
    leads = await db.leads.find(query, {"_id": 0}).sort(sort_by, sort_order).skip(skip).limit(limit).to_list(limit)
    return {"total": total, "leads": leads, "skip": skip, "limit": limit}

@api_router.get("/admin/leads/export")
async def admin_export_leads(x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(10000)
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=["id", "name", "email", "phone", "service_interest", "message", "source", "created_at"])
    writer.writeheader()
    for lead in leads:
        writer.writerow(lead)
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=leads_export.csv"},
    )

@api_router.delete("/admin/leads/{lead_id}")
async def admin_delete_lead(lead_id: str, x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"deleted": True}


# ── Admin Analytics ──

@api_router.get("/admin/analytics")
async def admin_get_analytics(x_admin_password: str = Header(None), days: int = 30):
    verify_admin(x_admin_password)
    total_leads = await db.leads.count_documents({})
    total_events = await db.analytics.count_documents({})

    # Events by type
    event_pipeline = [{"$group": {"_id": "$event_type", "count": {"$sum": 1}}}]
    event_counts = {}
    async for doc in db.analytics.aggregate(event_pipeline):
        event_counts[doc["_id"]] = doc["count"]

    # Leads by service
    service_pipeline = [{"$group": {"_id": "$service_interest", "count": {"$sum": 1}}}]
    service_counts = {}
    async for doc in db.leads.aggregate(service_pipeline):
        service_counts[doc["_id"]] = doc["count"]

    # Leads by source
    source_pipeline = [{"$group": {"_id": "$source", "count": {"$sum": 1}}}]
    source_counts = {}
    async for doc in db.leads.aggregate(source_pipeline):
        source_counts[doc["_id"]] = doc["count"]

    # Events by section
    section_pipeline = [
        {"$match": {"section": {"$ne": ""}}},
        {"$group": {"_id": "$section", "count": {"$sum": 1}}},
    ]
    section_counts = {}
    async for doc in db.analytics.aggregate(section_pipeline):
        section_counts[doc["_id"]] = doc["count"]

    # Recent leads (last 10)
    recent_leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(10)

    # Recent events (last 20)
    recent_events = await db.analytics.find({}, {"_id": 0}).sort("timestamp", -1).to_list(20)

    return {
        "total_leads": total_leads,
        "total_events": total_events,
        "event_breakdown": event_counts,
        "service_breakdown": service_counts,
        "source_breakdown": source_counts,
        "section_breakdown": section_counts,
        "recent_leads": recent_leads,
        "recent_events": recent_events,
    }


# ── Admin Blog CRUD ──

@api_router.get("/admin/blog")
async def admin_get_all_posts(x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return posts

@api_router.post("/admin/blog", response_model=BlogPost)
async def admin_create_post(input_data: BlogPostCreate, x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    post = BlogPost(**input_data.model_dump())
    post.slug = slugify(post.title)
    # Ensure unique slug
    existing = await db.blog_posts.find_one({"slug": post.slug})
    if existing:
        post.slug = f"{post.slug}-{str(uuid.uuid4())[:6]}"
    doc = post.model_dump()
    await db.blog_posts.insert_one(doc)
    return post

@api_router.put("/admin/blog/{post_id}", response_model=BlogPost)
async def admin_update_post(post_id: str, input_data: BlogPostUpdate, x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    update_data = {k: v for k, v in input_data.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    if "title" in update_data:
        update_data["slug"] = slugify(update_data["title"])
    await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@api_router.delete("/admin/blog/{post_id}")
async def admin_delete_post(post_id: str, x_admin_password: str = Header(None)):
    verify_admin(x_admin_password)
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"deleted": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
