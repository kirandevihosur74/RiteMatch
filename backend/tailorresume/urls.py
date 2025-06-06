from django.urls import path
from .views import TailorResumeView

urlpatterns = [
    path("", TailorResumeView.as_view(), name="tailor-resume"),
]