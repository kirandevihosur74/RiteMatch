from django.urls import path
from .views import UserSignup
from .views2 import UserSignIn

urlpatterns = [
    # ... other url patterns ...
    path('signup/', UserSignup.as_view()),
    path('signin/', UserSignIn.as_view())
]
