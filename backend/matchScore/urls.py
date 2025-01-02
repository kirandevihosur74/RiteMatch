# urls.py in your Django app
from django.urls import path
from .views import SkillMatchView

urlpatterns = [
    path('skills/', SkillMatchView.as_view(), name='skills'),
]
