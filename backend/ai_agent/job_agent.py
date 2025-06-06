# ai_agent/job_agent.py


from jobs.models import JobPosting
from user.models import UserProfile
import os
print("HF_TOKEN:", os.environ.get("HF_TOKEN"))
os.environ["HF_HUB_DISABLE_TELEMETRY"] = "1"
os.environ["TRANSFORMERS_OFFLINE"] = "0"
os.environ["HF_HOME"] = os.path.expanduser("~/.cache/huggingface")  # optional
os.environ.pop("HF_TOKEN", None)  # <== THIS REMOVES TOKEN
os.environ.pop("HUGGINGFACE_HUB_TOKEN", None)
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


class JobAgent:
    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2", use_auth_token=False)  # fast & good quality

    def run_agent(self, user) -> list:
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return []

        if not profile.skills:
            return []

        # 🧠 Step 1: Encode user skills
        user_skills = profile.skills  # "python, react, sql"
        user_embedding = self.model.encode(user_skills)

        # 📄 Step 2: Collect job data
        job_postings = JobPosting.objects.all()
        job_data = []
        job_texts = []

        for job in job_postings:
            combined_text = f"{job.title} {job.company} {job.description}"
            job_texts.append(combined_text)
            job_data.append(job)

        # 📐 Step 3: Encode jobs
        job_embeddings = self.model.encode(job_texts)

        # 🎯 Step 4: Compute cosine similarities
        similarities = cosine_similarity([user_embedding], job_embeddings)[0]

        # 📊 Step 5: Sort by similarity
        scored_jobs = sorted(
            zip(job_data, similarities),
            key=lambda x: x[1],
            reverse=True
        )

        # 🚀 Step 6: Format output
        top_jobs = []
        for job, score in scored_jobs[:50]:  # top 50
            top_jobs.append({
                "job": {
                    "title": job.title,
                    "company": job.company,
                    "location": job.location,
                    "jobUrl": job.jobUrl,
                    "eligibility_percentage": round(score * 100, 2)
                }
            })

        return top_jobs