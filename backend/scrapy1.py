import os
import django
import pandas as pd
from datetime import datetime

from jobspy import scrape_jobs

# Set Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from jobs.models import JobPosting

# Function to import job data directly from a DataFrame
def import_job_data(data):
    # Ensure date_posted is in the correct format and converted to string
    data['date_posted'] = pd.to_datetime(data['date_posted'], errors='coerce').dt.strftime('%Y-%m-%d')

    for index, row in data.iterrows():
        posted_date = row['date_posted'] if not pd.isna(row['date_posted']) else None

        JobPosting.objects.create(
            jobUrl=row['job_url'],
            site=row['site'],
            title=row['title'],
            company=row['company'],
            location=row['location'],
            jobType=row.get('job_type', None),
            datePosted=posted_date,
            description=row.get('description', None),
            cleanedDescription=row.get('cleaned_description', None)
        )

# Scrape job postings
jobs = scrape_jobs(
    site_name=["indeed", "linkedin"],
    search_term="software engineer",
    location="Dallas, TX",
    results_wanted=20,
    country_indeed='USA'  # only needed for indeed / glassdoor
)

print(f"Found {len(jobs)} jobs")
print(jobs.head())

# Directly pass the jobs DataFrame to the import function
import_job_data(jobs)
