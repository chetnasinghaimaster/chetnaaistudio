import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# POST /api/leads - create lead
def test_create_lead():
    payload = {"name": "TEST_User", "phone": "9999999999", "email": "test@example.com", "message": "Test message"}
    r = requests.post(f"{BASE_URL}/api/leads", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert data["name"] == "TEST_User"
    assert data["phone"] == "9999999999"
    assert "id" in data
    print(f"PASS: create_lead - id={data['id']}")

# GET /api/leads
def test_get_leads():
    r = requests.get(f"{BASE_URL}/api/leads")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    print(f"PASS: get_leads - count={len(data)}")

# POST /api/analytics
def test_track_event():
    payload = {"event_type": "test_event", "section": "hero", "metadata": {"test": True}}
    r = requests.post(f"{BASE_URL}/api/analytics", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert data["event_type"] == "test_event"
    print(f"PASS: track_event - id={data['id']}")

# GET /api/analytics/summary
def test_analytics_summary():
    r = requests.get(f"{BASE_URL}/api/analytics/summary")
    assert r.status_code == 200
    data = r.json()
    assert "total_leads" in data
    assert "total_events" in data
    print(f"PASS: analytics_summary - leads={data['total_leads']}, events={data['total_events']}")

# Validation: missing required field
def test_create_lead_missing_phone():
    payload = {"name": "TEST_NoPhone"}
    r = requests.post(f"{BASE_URL}/api/leads", json=payload)
    assert r.status_code == 422
    print("PASS: create_lead_missing_phone - correctly returns 422")
