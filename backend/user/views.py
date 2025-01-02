from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer


# class UserSignup(APIView):
#     def post(self, request, format=None):
#         serializer = UserProfileSerializer(data=request.data)
#         if serializer.is_valid():
#             user_data = serializer.validated_data.pop('user')
#             print(f"user dai is: {user_data}")
#
#             # Check if username already exists
#             if User.objects.filter(username=user_data['username']).exists():
#                 return Response({'user': {'username': ['A user with that email already exists.']}},
#                                 status=status.HTTP_400_BAD_REQUEST)
#
#             # Create the User instance
#             user = User.objects.create_user(**user_data)
#
#             # Create the UserProfile instance
#             UserProfile.objects.create(user=user, **serializer.validated_data)
#
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#

class UserSignup(APIView):
    def post(self, request, format=None):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
