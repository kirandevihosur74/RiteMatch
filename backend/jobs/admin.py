from django.contrib import admin
from .models import JobPosting


models_list = [JobPosting]
admin.site.register(models_list)
