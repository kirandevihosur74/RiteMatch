# from django.contrib.auth import authenticate
# from rest_framework.response import Response
# from rest_framework import status
#
#
# def post(request, format=None):
#     username = request.data.get('username')
#     password = request.data.get('password')
#
#     user = authenticate(username=username, password=password)
#     if user is not None:
#         # Login successful
#         return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
#     else:
#         # Authentication failed
#         print(password)
#         return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#
#
#
# # class UserSignIn(APIView):
# #     def post(self, request, format=None):
# #         email = request.data.get('email')
# #         password = request.data.get('password')
# #
# #         # Find the user by email
# #         try:
# #             user = User.objects.get(email=email)
# #         except User.DoesNotExist:
# #             return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
# #
# #         # Authenticate the user
# #         user = authenticate(username=user.username, password=password)
# #         if user is not None:
# #             # Login successful
# #             return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
# #         else:
# #             # Authentication failed
# #             return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

class UserSignIn(APIView):
    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')

        # Find the user by email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

        # Authenticate the user
        user = authenticate(username=user.username, password=password)
        if user is not None:
            # Generate or retrieve token
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Login successful',
                'username': user.username,
                'token': token.key
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)