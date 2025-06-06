# ai_agent/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from user.models import UserProfile
from ai_agent.job_agent import JobAgent

class JobAgentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        try:
            profile = UserProfile.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response(
                {"detail": "UserProfile not found. Please complete your profile."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_name = f"{user.first_name} {user.last_name}".strip() or user.username
        user_intro = request.data.get(
            "intro",
            "I’m actively seeking software engineering opportunities."
        )

        # ✅ Extract skills from profile
        if profile.skills:
            user_skills = [skill.strip().lower() for skill in profile.skills.split(",")]
        else:
            return Response(
                {"detail": "No skills found in profile."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            agent = JobAgent()
            results = agent.run_agent(user=user)
        except Exception as e:
            return Response(
                {"detail": f"Error running agent: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response(results, status=status.HTTP_200_OK)