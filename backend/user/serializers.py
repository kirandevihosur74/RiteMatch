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
    skills = serializers.CharField(
        required=False,
        allow_blank=True,
        help_text="Comma-separated list of skills, e.g. 'python,django,react'"
    )

    class Meta:
        model = UserProfile
        fields = [
            'user',
            'dateOfBirth',
            'address_1',
            'address_2',
            'city',
            'country',
            'state',
            'zip',
            'cell',
            'skills',
        ]

    def create(self, validated_data):
        """
        1. Pop the nested user data, create a User via UserSerializer.
        2. Use remaining fields (including 'skills') to create UserProfile.
        """
        user_data = validated_data.pop('user')
        # Create the User first
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)

        # Now create the UserProfile, passing along 'skills' if present
        user_profile = UserProfile.objects.create(
            user=user,
            dateOfBirth=validated_data.get('dateOfBirth'),
            address_1=validated_data.get('address_1'),
            address_2=validated_data.get('address_2', ''),
            city=validated_data.get('city'),
            country=validated_data.get('country'),
            state=validated_data.get('state'),
            zip=validated_data.get('zip'),
            cell=validated_data.get('cell'),
            skills=validated_data.get('skills', '')
        )
        return user_profile

    def update(self, instance, validated_data):
        """
        Allow updating nested user fields as well as profile fields.
        """
        # Update nested User first, if provided
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            # Only update the fields provided in user_data
            for attr, value in user_data.items():
                if attr == 'password':
                    user.set_password(value)
                else:
                    setattr(user, attr, value)
            user.save()

        # Update UserProfile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance