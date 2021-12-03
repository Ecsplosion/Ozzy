from django.contrib.auth import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(widget=forms.TextInput(attrs={'name': 'first_name', 'placeholder':'First Name...'}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={'name': 'last_name', 'placeholder':'Last Name...'}))
    username = forms.CharField(widget=forms.TextInput(attrs={'name': 'username', 'placeholder':'Email'}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'name': 'password1', 'placeholder':'Create Password'}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'name': 'password2', 'placeholder':'Confirm Password'}))
    class Meta:
        model = User
        fields = ['first_name','last_name','username','password1', 'password2']