from rest_framework import serializers
from .models import JobPosting


class JobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = ('jobUrl',
                  'site',
                  'title',
                  'company',
                  'location',
                  'description'
                  )
