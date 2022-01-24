from django.shortcuts import render

# Create your views here.
def viewerpage(request):
    return render(request, 'viewer/viewer.html')
def responsiveviewerpage(request):
    return render(request, 'viewer/responsive.html')