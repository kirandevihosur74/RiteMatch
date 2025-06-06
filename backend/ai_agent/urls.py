from django.urls import path
from .views import JobAgentView
from .aiviews import SuggestRolesView

urlpatterns = [
    path("", JobAgentView.as_view(), name="job-agent"),
    path('suggest-roles/', SuggestRolesView.as_view(), name="suggest-roles"),
]