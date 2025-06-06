from django.contrib.auth.models import User
from django.db import models
from django_countries.fields import CountryField
from datetime import date


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dateOfBirth = models.DateField(default=date(1980, 1, 1))
    address_1 = models.CharField(max_length=255)
    address_2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100)
    country = CountryField(blank_label='(select country)')
    state = models.CharField(max_length=100)
    zip = models.CharField(max_length=20)
    cell = models.CharField(max_length=15)
    skills = models.TextField(
        blank=True,
        help_text="Comma-separated list of user skills, e.g. 'python,django,react'"
    )
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username

    def skill_list(self):
        """
        Return a list of lowercase skills extracted from the comma-separated string.
        """
        if not self.skills:
            return []
        return [s.strip().lower() for s in self.skills.split(",") if s.strip()]