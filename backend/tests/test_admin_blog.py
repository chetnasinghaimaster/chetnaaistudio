import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
ADMIN_PASSWORD = "chetna2024admin"
WRONG_PASSWORD = "wrongpassword"
HEADERS = {"x-admin-password": ADMIN_PASSWORD}

# Admin Auth
def test_admin_auth_correct_password():
    r = requests.post(f"{BASE_URL}/api/admin/auth", headers=HEADERS)
    assert r.status_code == 200
    assert r.json()["authenticated"] == True

def test_admin_auth_wrong_password():
    r = requests.post(f"{BASE_URL}/api/admin/auth", headers={"x-admin-password": WRONG_PASSWORD})
    assert r.status_code == 401

def test_admin_auth_no_password():
    r = requests.post(f"{BASE_URL}/api/admin/auth")
    assert r.status_code == 401

# Admin Leads
def test_admin_get_leads():
    r = requests.get(f"{BASE_URL}/api/admin/leads", headers=HEADERS)
    assert r.status_code == 200
    data = r.json()
    assert "total" in data
    assert "leads" in data
    assert isinstance(data["leads"], list)

def test_admin_get_leads_unauthorized():
    r = requests.get(f"{BASE_URL}/api/admin/leads")
    assert r.status_code == 401

def test_admin_get_leads_with_search():
    r = requests.get(f"{BASE_URL}/api/admin/leads?search=TEST", headers=HEADERS)
    assert r.status_code == 200

def test_admin_get_leads_with_service_filter():
    r = requests.get(f"{BASE_URL}/api/admin/leads?service=website", headers=HEADERS)
    assert r.status_code == 200

def test_admin_export_leads_csv():
    r = requests.get(f"{BASE_URL}/api/admin/leads/export", headers=HEADERS)
    assert r.status_code == 200
    assert "text/csv" in r.headers.get("content-type", "")

def test_admin_delete_lead_not_found():
    r = requests.delete(f"{BASE_URL}/api/admin/leads/nonexistent-id", headers=HEADERS)
    assert r.status_code == 404

# Admin Analytics
def test_admin_get_analytics():
    r = requests.get(f"{BASE_URL}/api/admin/analytics", headers=HEADERS)
    assert r.status_code == 200
    data = r.json()
    assert "total_leads" in data
    assert "total_events" in data
    assert "event_breakdown" in data
    assert "service_breakdown" in data
    assert "source_breakdown" in data
    assert "section_breakdown" in data
    assert "recent_leads" in data
    assert "recent_events" in data

def test_admin_analytics_unauthorized():
    r = requests.get(f"{BASE_URL}/api/admin/analytics")
    assert r.status_code == 401

# Public Blog
def test_get_published_posts():
    r = requests.get(f"{BASE_URL}/api/blog")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    for post in data:
        assert post["published"] == True

def test_get_blog_post_by_slug():
    r = requests.get(f"{BASE_URL}/api/blog/5-reasons-your-website-isnt-getting-leads")
    assert r.status_code == 200
    data = r.json()
    assert "title" in data
    assert "content" in data
    assert data["slug"] == "5-reasons-your-website-isnt-getting-leads"

def test_get_blog_post_404():
    r = requests.get(f"{BASE_URL}/api/blog/nonexistent-slug-xyz-123")
    assert r.status_code == 404

def test_get_blog_with_tag_filter():
    r = requests.get(f"{BASE_URL}/api/blog?tag=SEO")
    assert r.status_code == 200

# Admin Blog CRUD
def test_admin_get_all_blog_posts():
    r = requests.get(f"{BASE_URL}/api/admin/blog", headers=HEADERS)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 3  # 3 seeded posts

def test_admin_create_update_delete_blog_post():
    # Create
    payload = {
        "title": "TEST_Post New Blog",
        "excerpt": "Test excerpt",
        "content": "Test content",
        "tags": ["test"],
        "published": False
    }
    r = requests.post(f"{BASE_URL}/api/admin/blog", json=payload, headers=HEADERS)
    assert r.status_code == 200
    post = r.json()
    assert post["title"] == "TEST_Post New Blog"
    assert "id" in post
    assert "slug" in post
    post_id = post["id"]

    # Update
    r2 = requests.put(f"{BASE_URL}/api/admin/blog/{post_id}", json={"published": True, "excerpt": "Updated excerpt"}, headers=HEADERS)
    assert r2.status_code == 200
    updated = r2.json()
    assert updated["published"] == True

    # Delete
    r3 = requests.delete(f"{BASE_URL}/api/admin/blog/{post_id}", headers=HEADERS)
    assert r3.status_code == 200
    assert r3.json()["deleted"] == True

def test_admin_blog_unauthorized():
    r = requests.get(f"{BASE_URL}/api/admin/blog")
    assert r.status_code == 401
