from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, permissions
from user.models import UserProfile

import os
import docx2txt
import fitz  # PyMuPDF
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

class ResumeUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        resume = request.FILES.get('resume')
        if not resume:
            return Response({"error": "No resume file provided."}, status=status.HTTP_400_BAD_REQUEST)

        file_ext = os.path.splitext(resume.name)[1].lower()
        try:
            if file_ext == ".pdf":
                text = self.extract_text_from_pdf(resume)
            elif file_ext in [".doc", ".docx"]:
                text = self.extract_text_from_docx(resume)
            else:
                return Response({"error": "Unsupported file format. Upload PDF or DOCX."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": f"Error parsing resume: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Use Gemini to extract skills
        try:
            prompt = f"""
            Extract all technical and soft skills mentioned in the following resume text.
            Return them as a comma-separated list. Only include skill names, nothing else.

            Resume Text:
            {text}
            """

            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)
            raw_output = response.text.strip()
            extracted_skills = [s.strip().lower() for s in raw_output.split(",") if s.strip()]
        except Exception as e:
            return Response({"error": f"Gemini API error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Save to profile
        try:
            profile, _ = UserProfile.objects.get_or_create(user=request.user)
            profile.skills = ", ".join(extracted_skills)
            profile.save()
        except Exception as e:
            return Response({"error": f"Error updating user profile: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "message": "Resume uploaded and skills extracted successfully.",
            "skills": extracted_skills,
            "resume_text": text
        }, status=status.HTTP_200_OK)

    def extract_text_from_pdf(self, file):
        doc = fitz.open(stream=file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text

    def extract_text_from_docx(self, file):
        return docx2txt.process(file)