from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import json
import google.generativeai as genai

# Load Gemini API key from environment
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class SuggestRolesView(APIView):
    def post(self, request):
        resume_text = request.data.get("resume_text")
        if not resume_text:
            return Response({"error": "Missing resume_text"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Use Gemini 1.5 Flash model
            model = genai.GenerativeModel("models/gemini-1.5-flash")

            prompt = (
                "You're a resume analysis assistant.\n\n"
                "Given the resume text below, extract:\n"
                "- The top 3–5 suitable job roles\n"
                "- The top 5 most relevant technical skills\n"
                "- An overall resume strength score out of 100 (based on relevance, clarity, and completeness)\n\n"
                "Return a pure JSON object ONLY in the following format:\n"
                "{\n"
                "  \"roles\": [\"role1\", \"role2\", \"role3\"],\n"
                "  \"skills\": [\"skill1\", \"skill2\", \"skill3\"],\n"
                "  \"score\": 85\n"
                "}\n\n"
                "Do not include any extra formatting, markdown, or commentary.\n\n"
                f"Resume:\n{resume_text}"
            )

            response = model.generate_content(prompt)
            raw_output = response.text.strip()

            # Optional cleanup if Gemini returns ```json
            if raw_output.startswith("```"):
                raw_output = raw_output.strip("```").replace("json", "").strip()

            parsed = json.loads(raw_output)

            return Response(parsed, status=status.HTTP_200_OK)

        except json.JSONDecodeError:
            return Response(
                {"error": "Gemini response was not valid JSON", "raw_output": raw_output},
                status=status.HTTP_502_BAD_GATEWAY
            )
        except Exception as e:
            return Response(
                {"error": f"Gemini error: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )