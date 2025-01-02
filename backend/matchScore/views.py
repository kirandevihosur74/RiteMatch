from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .nlp_model import process_skills  # Import your process_skills function


class SkillMatchView(APIView):
    def post(self, request, *args, **kwargs):
        user_skills = request.data.get('skills', [])
        matches = process_skills(user_skills)
        return Response(matches)  # DRF handles converting to JSON
