from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return HttpResponse("welcome to main! in development")
def projects(request):
    return HttpResponse("projects page. in development")
def project(request, number):
    return HttpResponse(f"project {number}: -PROJECT_NAME-")