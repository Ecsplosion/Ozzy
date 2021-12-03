from django.http import request
from django.shortcuts import redirect, render
from users.models import UserProfile
from . models import Case, Comment
from . forms import CaseForm, CommentForm
from django.core.mail import send_mail
from django.conf import settings
from django.urls import resolve
# Create your views here.
def dashboard(request):
    active_user = request.user
    try:
        cases = Case.objects.filter(user = active_user)
        no_of_cases = len(cases)
    except:
        no_of_cases = 0
    active_profile = UserProfile.objects.get(user=active_user)
    context = {'user': active_profile, 'total_cases': no_of_cases}
    return render(request,'cases/user-dashboard.html', context)
def casespage(request):
    active_user = request.user
    active_profile = UserProfile.objects.get(user = active_user)
    cases = Case.objects.filter(user = active_user)
    print(cases)
    context = {'cases': cases,'user': active_profile}
    return render(request,'cases/cases.html', context)
def casepage(request, pk):
    active_user = request.user
    active_profile = UserProfile.objects.get(user = active_user)
    case = Case.objects.get(id=pk)
    comments = Comment.objects.filter(related_case = case)
    commentForm = CommentForm()
    if request.method == 'POST':
        commentForm = CommentForm(request.POST)
        if commentForm.is_valid():
            form1 = commentForm.save(commit=False)
            form1.related_case = case
            print('Success')
            form1.posted_by = active_user
            mail_message = form1.comment
            
            form1.save()

            send_mail(
                'Django Mail Service',
                f'{mail_message} Case: http://127.0.0.1:8000/dashboard/case/{pk}/ by {request.user.username}',
                'zaidbzaheer3@gmail.com',
                ['zaidbzaheer2@gmail.com'],
                fail_silently= False,
            )
    context = {'case': case ,'user': active_profile,'comment_form': commentForm, 'comments': comments}
    return render(request,'cases/case.html', context)
def submitcasepage(request):
    form = CaseForm()
    active_user= request.user
    if request.method == 'POST':
        form = CaseForm(request.POST, request.FILES)
        if form.is_valid():
                print('Success')
                form1 = form.save(commit=False)
                form1.user = active_user
                form1.save()
                print('success')
                print(form.errors)
                return redirect('DashboardPage')    
        else:
            print(form.errors)
    active_profile = UserProfile.objects.get(user = active_user)
    context = {'form':form,'user': active_profile}
    return render(request, 'cases/submit-a-case.html', context)

def case_model(request):
    return render(request,'cases/3d-model.html')
def publiccases(request):
    case = Case.objects.all().order_by('-date_created')
    
    context = {'case':case}
    return render(request,'cases/public-cases.html',context)
def publiccase(request,pk):
    case = Case.objects.get(id=pk)
    comments = Comment.objects.filter(related_case = case).order_by('date_posted')
    commentForm = CommentForm()
    if request.method == 'POST':
        commentForm = CommentForm(request.POST)
        if commentForm.is_valid():
            form1 = commentForm.save(commit=False)
            form1.posted_by = request.user
            form1.related_case = case
            form1.save()
            send_mail(
                'CASE SUBMISSION',
                f'{form1.comment} by {request.user.username}',
                '',
                [case.user.username]
            )
            return redirect(f'https://ozzysmile.herokuapp.com/dashboard/case-detail/{pk}/')
    context = {
        'case':case,
        'comments': comments,
        'form':commentForm
    }
    return render(request,'cases/public-case.html',context)