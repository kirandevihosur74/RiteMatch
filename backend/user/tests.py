from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import UserProfile

class UserProfileSerializerTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        # URL of your signup endpoint
        self.signup_url = reverse('signup')

    def test_create_user_and_profile_with_skills(self):
        """
        Ensure we can create a User + UserProfile (including skills) via the serializer.
        """
        payload = {
            "user": {
                "first_name": "Alice",
                "last_name": "Anderson",
                "email": "alice@example.com",
                "password": "supersecret123"
            },
            "dateOfBirth": "1990-01-01",
            "address_1": "123 Main St",
            "address_2": "",
            "city": "Wonderland",
            "country": "US",        # or whatever valid country code
            "state": "CA",
            "zip": "94107",
            "cell": "555-1234",
            "skills": "Python,Django,React"
        }

        response = self.client.post(self.signup_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Confirm the User was created
        created_email = response.data['user']['email']
        self.assertEqual(created_email, "alice@example.com")
        username = response.data['user']['username']
        self.assertTrue(User.objects.filter(username=username).exists())

        # Confirm the UserProfile was created and skills stored correctly
        user = User.objects.get(username=username)
        profile = UserProfile.objects.get(user=user)
        self.assertEqual(profile.city, "Wonderland")
        self.assertEqual(profile.skills, "Python,Django,React")

        # Confirm skill_list() helper returns a list of lowercased skills
        self.assertListEqual(profile.skill_list(), ["python", "django", "react"])

    def test_update_user_profile_and_skills(self):
        """
        Ensure we can update an existing UserProfile (including skills) via the serializer.
        """
        # First, create an initial user+profile
        initial_payload = {
            "user": {
                "first_name": "Bob",
                "last_name": "Builder",
                "email": "bob@example.com",
                "password": "buildit123"
            },
            "dateOfBirth": "1985-05-05",
            "address_1": "456 Elm St",
            "address_2": "",
            "city": "Constructville",
            "country": "US",
            "state": "NY",
            "zip": "10001",
            "cell": "555-5678",
            "skills": "Go,Flask"
        }
        create_resp = self.client.post(self.signup_url, initial_payload, format='json')
        self.assertEqual(create_resp.status_code, status.HTTP_201_CREATED)

        # Locate the created user & profile
        created_username = create_resp.data['user']['username']
        user = User.objects.get(username=created_username)
        profile = UserProfile.objects.get(user=user)

        # Now log in as that user (or simulate authentication)
        # For simplicity, we'll manually set the profile and call serializer.update()
        update_payload = {
            "user": {
                "first_name": "Bobby",
                "last_name": "Builder",
                # email remains unchanged
            },
            "city": "NewTown",
            "skills": "Go,Flask,Django"  # new skill added
        }

        # Manually instantiate serializer with instance=profile
        from .serializers import UserProfileSerializer
        serializer = UserProfileSerializer(instance=profile, data=update_payload, partial=True)
        self.assertTrue(serializer.is_valid(), msg=serializer.errors)
        updated_profile = serializer.save()

        # Refresh from DB
        profile.refresh_from_db()
        user.refresh_from_db()

        # Confirm the user name changed
        self.assertEqual(user.first_name, "Bobby")
        self.assertEqual(user.last_name, "Builder")

        # Confirm profile city updated and skills appended
        self.assertEqual(profile.city, "NewTown")
        self.assertEqual(profile.skills, "Go,Flask,Django")
        self.assertListEqual(profile.skill_list(), ["go", "flask", "django"])