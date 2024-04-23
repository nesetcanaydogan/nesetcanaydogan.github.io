from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("projects", views.projects, name="projects"),
    path("<str:number>", views.project, name="project")
]