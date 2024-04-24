from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "main/index.html")
def projects(request):
    return HttpResponse("projects page")
def projectNumber(request, number):
    return HttpResponse(f"project {number.capitalize()}: -PROJECT_NAME-")