import os
import django
import requests
import pandas as pd
from datetime import datetime

# Django setup
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from jobs.models import JobPosting

RAPIDAPI_KEY = "826e628f72mshd08a53e462278b1p14cdb9jsnc4fb908a2a54"  # Replace with your actual API key
BASE_URL = "https://jsearch.p.rapidapi.com/search"

HEADERS = {
    "X-RapidAPI-Key": RAPIDAPI_KEY,
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
}

def fetch_jobs(query="software engineer", location="New York, NY", num_pages=1):
    all_jobs = []

    for page in range(1, num_pages + 1):
        params = {
            "query": query,
            "page": page,
            "num_pages": 5,
            "location": location
        }

        response = requests.get(BASE_URL, headers=HEADERS, params=params)
        if response.status_code != 200:
            print(f"Failed on page {page}: {response.text}")
            continue

        results = response.json().get("data", [])
        all_jobs.extend(results)

    return all_jobs

def transform_jobs(raw_jobs):
    jobs = []
    for job in raw_jobs:
        jobs.append({
            "jobUrl": job.get("job_apply_link"),
            "site": "JSearch",
            "title": job.get("job_title"),
            "company": job.get("employer_name"),
            "location": job.get("job_city") + ", " + job.get("job_state", ""),
            "jobType": job.get("job_employment_type"),
            "datePosted": job.get("job_posted_at_datetime_utc")[:10] if job.get("job_posted_at_datetime_utc") else datetime.utcnow().strftime("%Y-%m-%d"),
            "description": job.get("job_description"),
            "cleanedDescription": job.get("job_description")  # You can add your own cleaner later
        })
    return jobs

def import_job_data(jobs):
    for job in jobs:
        if not job.get("jobUrl"):
            continue
        JobPosting.objects.create(
            jobUrl=job["jobUrl"],
            site=job["site"],
            title=job["title"],
            company=job["company"],
            location=job["location"],
            jobType=job["jobType"],
            datePosted=job["datePosted"] or None,
            description=job["description"],
            cleanedDescription=job["cleanedDescription"]
        )

if __name__ == "__main__":
    raw_jobs = fetch_jobs(query="software engineer", location="Dallas, TX", num_pages=1)
    job_data = transform_jobs(raw_jobs)
    print(f"Fetched {len(job_data)} jobs from JSearch")
    import_job_data(job_data)