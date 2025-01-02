from django.db import models


class JobPosting(models.Model):
    jobUrl = models.URLField()
    site = models.CharField(max_length=255, null=True)
    title = models.CharField(max_length=255, null=True)
    company = models.CharField(max_length=255, null=True)
    location = models.CharField(max_length=255, null=True)
    jobType = models.CharField(max_length=255, null=True)
    datePosted = models.DateField(null=True)
    description = models.TextField(null=True)
    cleanedDescription = models.TextField(null=True)

    def __str__(self):
        return self.title
