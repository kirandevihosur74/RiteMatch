from django.urls import path
from .views import JobsView

urlpatterns = [
    path('jobs/', JobsView.as_view()),
    path('jobs/<int:pk>/', JobsView.as_view())
]
