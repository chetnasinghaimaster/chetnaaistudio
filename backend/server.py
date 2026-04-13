from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
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

app = FastAPI()
api_router = APIRouter(prefix="/api")


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


# Routes
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
    
    pipeline = [
        {"$group": {"_id": "$event_type", "count": {"$sum": 1}}}
    ]
    event_counts = {}
    async for doc in db.analytics.aggregate(pipeline):
        event_counts[doc["_id"]] = doc["count"]
    
    service_pipeline = [
        {"$group": {"_id": "$service_interest", "count": {"$sum": 1}}}
    ]
    service_counts = {}
    async for doc in db.leads.aggregate(service_pipeline):
        service_counts[doc["_id"]] = doc["count"]
    
    return {
        "total_leads": total_leads,
        "total_events": total_events,
        "event_breakdown": event_counts,
        "service_breakdown": service_counts
    }

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
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
