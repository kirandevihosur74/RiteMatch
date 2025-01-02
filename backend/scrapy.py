import os
import django
import pandas as pd
from datetime import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from jobs.models import JobPosting


def import_job_data(csv_file_path):
    data = pd.read_csv(csv_file_path)

    # Ensure date_posted is in the correct format and converted to string
    data['date_posted'] = pd.to_datetime(data['date_posted'], errors='coerce').dt.strftime('%Y-%m-%d')

    for index, row in data.iterrows():
        # No need for try-except block as we already handled date conversion
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


csv_file_path = 'Cleaned_Jobs_Final.csv'
import_job_data(csv_file_path)
