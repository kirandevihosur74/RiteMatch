import random
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        email = validated_data['email']
        password = validated_data['password']

        # Generate a unique username
        username_base = f"{first_name}{last_name}".lower()
        username = f"{username_base}{random.randint(1000, 9999)}"

        # Ensure the username is unique
        while User.objects.filter(username=username).exists():
            username = f"{username_base}{random.randint(1000, 9999)}"

        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'dateOfBirth', 'address_1', 'address_2', 'city', 'country', 'state', 'zip', 'cell']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile
