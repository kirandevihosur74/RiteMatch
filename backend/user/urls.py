from django.urls import path
from .views import UserSignup
from .views2 import UserSignIn
from .resume_views import ResumeUploadView
urlpatterns = [
    # ... other url patterns ...
    path('signup/', UserSignup.as_view()),
    path('signin/', UserSignIn.as_view()),
    path("upload-resume/", ResumeUploadView.as_view(), name="upload-resume"),
]
