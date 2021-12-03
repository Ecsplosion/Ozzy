from django.contrib.auth import authenticate
from django.shortcuts import redirect, render
from . forms import CustomUserCreationForm
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from . models import UserProfile
# Create your views here.
def loginpage(request):
    if User.is_authenticated:
        logout(request)
    if request.POST.get('action') == 'register':
        form = CustomUserCreationForm(request.POST)
        profile_pic = request.FILES['profile_image']
     
        if form.is_valid():
            new_user = form.save()
            print('FORM SAVED')
            UserProfile.objects.create(
                    user = new_user,
                    profile_pic = profile_pic
                )
                
            login(request, new_user)
            return redirect('HomePage')
        else:
            print(form.errors)
    elif request.POST.get('action') == 'login':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username = username, password = password)
        if user is not None:
            login(request, user)
            return redirect('HomePage')
    form = CustomUserCreationForm()
    context = {'form': form}
    return render(request, 'users/login.html', context)