# backend/job_agent.py (updated)

import os
import openai
import requests
from django.conf import settings

try:
    from matchScore.nlp_model import process_skills
except ImportError:
    process_skills = None

AGENT_USE_HTTP = False
AGENT_SKILLS_URL = "http://localhost:8000/skills/"
TOP_K = 3

openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise RuntimeError("Please set OPENAI_API_KEY as an environment variable.")


class JobAgent:
    def __init__(self):
        self.llm_model = "gpt-4"  # or "gpt-3.5-turbo"

    def fetch_top_matches(self, user_skills):
        if AGENT_USE_HTTP:
            payload = {"skills": user_skills}
            resp = requests.post(AGENT_SKILLS_URL, json=payload)
            resp.raise_for_status()
            matches = resp.json()
        else:
            if not process_skills:
                raise RuntimeError("process_skills not available; set AGENT_USE_HTTP=True.")
            matches = process_skills(user_skills)
        return matches[:TOP_K]

    def generate_application_text(self, user_name, user_intro, job_posting):
        title = job_posting.get("title", "<Unknown Title>")
        company = job_posting.get("company", "<Unknown Company>")
        url = job_posting.get("job_url", "")
        location = job_posting.get("location", "")

        prompt = f"""
You are an AI assistant that crafts short, personalized application messages.
Given the user’s information and a job posting, write a concise message (2-3 sentences)
that the user named {user_name} could send to recruiters at {company} applying for "{title}".
Mention one relevant skill or experience from the user's background and why this role at {company} is appealing.
Keep it under 100 words, and return only the application text.

User Introduction:
Name: {user_name}
Intro: {user_intro}

Job Posting:
Title: {title}
Company: {company}
Location: {location}
URL: {url}
"""

        # <--- Updated call to match OpenAI Python SDK v1+ --->
        completion = openai.chat.completions.create(
            model=self.llm_model,
            messages=[
                {"role": "system", "content": "You generate concise, professional application messages."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=200,
            temperature=0.7,
        )

        return completion.choices[0].message.content.strip()

    def run_agent(self, user_name, user_intro, user_skills):
        top_matches = self.fetch_top_matches(user_skills)
        results = []
        for job in top_matches:
            text = self.generate_application_text(user_name, user_intro, job)
            results.append({"job": job, "application_text": text})
        return results


if __name__ == "__main__":
    import django

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
    django.setup()

    agent = JobAgent()
    user_name = "Kiran Devihosur"
    user_intro = "I’m a Full Stack Engineer with 3+ years of experience in Java, React, Django, and AI-powered systems."
    user_skills = ["python", "django", "react", "nlp", "docker"]

    print("Fetching top job matches and generating application messages...\n")
    res = agent.run_agent(user_name, user_intro, user_skills)

    for i, item in enumerate(res, 1):
        job = item["job"]
        print(f"Match #{i}: {job.get('title')} @ {job.get('company')} ({job.get('location')})")
        print(f"Eligibility: {job.get('eligibility_percentage')}%")
        print(f"Apply Link: {job.get('job_url')}\n")
        print(f"Application Message:\n{item['application_text']}\n")
        print("-" * 80)