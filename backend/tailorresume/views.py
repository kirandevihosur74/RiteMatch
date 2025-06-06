# tailorresume/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import openai

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

class TailorResumeView(APIView):
    def post(self, request):
        resume_text = request.data.get("resume_text")
        job_description = request.data.get("job_description")

        if not resume_text or not job_description:
            return Response(
                {"error": "Both resume_text and job_description are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            system_prompt = (
                "You are an expert resume optimization assistant. "
                "Your task is to tailor resumes to specific job descriptions by enhancing relevant experience, "
                "skills, and keywords. Always rewrite in clean, professional plain text with no markdown or comments."
            )

            user_prompt = (
                f"Tailor the following resume to match the job description. "
                f"Rephrase content to better reflect the required qualifications. "
                f"Do not invent any fake experience. Return only the tailored resume.\n\n"
                f"Resume:\n{resume_text}\n\nJob Description:\n{job_description}"
            )

            response = openai.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7
            )

            tailored_resume = response.choices[0].message.content.strip()

            return Response({"tailored_resume": tailored_resume}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"OpenAI error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )