from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.decorators import login_required
from . models import ThreeDCase
from . forms import ThreeDCaseForm
from django.core.mail import send_mail
from . serializers import glbSerializer
# Create your views here.

def viewerpage(request):
    return render(request, 'viewer/viewer.html')
def responsiveviewerpage(request):
    return render(request, 'viewer/responsive.html')
def viewpage(request, pk):
    Case = ThreeDCase.objects.get(id=pk)
    context = {'case': Case}
    return render(request, 'viewer/view.html', context)
@login_required(login_url='CaseLoginPage')
def submitcase(request):
    current_user = request.user
    current_site = str(request.build_absolute_uri()).replace('submit-case', 'responsive')
    form = ThreeDCaseForm()
  
    if request.method == 'POST':
        form = ThreeDCaseForm(request.POST, request.FILES)
        if form.is_valid():
            form1 = form.save(commit=False)
            form1.user = current_user
            form1.save()
            case_id = form1.id
            return redirect('SuccessPage', case_id)


    context= {'form': form}
    return render(request, 'viewer/submit-case.html', context)
def loginpage(request):
    if User.is_authenticated:
        logout(request)
    if request.method =='POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('SubmitFormPage')
    return render(request, 'viewer/login-page.html')
def successpage(request, pk):
    current_site = str(request.build_absolute_uri()).replace('submit-case/success', 'responsive')
    Case= ThreeDCase.objects.get(id=pk)
    if request.method == 'POST':
        return redirect('ViewPage', Case.id)
    return render(request, 'viewer/success-page.html')
class ViewData(APIView):
    try:
        def get(self,request,format=None, *args, **kwargs):
            glb_models = ThreeDCase.objects.get(id=kwargs['pk'])
            serializer = glbSerializer(glb_models, many=False)
            return Response(serializer.data)
    except Exception as e:
        print(e)