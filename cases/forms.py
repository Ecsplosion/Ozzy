from django import forms
from django.db.models import fields
from django.forms.widgets import FileInput, TextInput
from . models import Case, Comment
from froala_editor.fields import FroalaEditor

class CaseForm(forms.ModelForm):
    title = forms.CharField(widget=TextInput(attrs={'name': 'case_title', 'placeholder': 'Title Here....'}))
    description = forms.CharField(widget=FroalaEditor(attrs={'name': 'case_description'}))
    general_view = forms.FileField(widget=FileInput(attrs={'name': 'general_view'}))
    front_view = forms.FileField(widget=FileInput(attrs={'name':'front_view'}))
    right_view = forms.FileField(widget=FileInput(attrs={'name':'right_view'}))
    left_view = forms.FileField(widget=FileInput(attrs={'name':'left_view'}))
    top_view = forms.FileField(widget=FileInput(attrs={'name':'top_view'}))
    bottom_view = forms.FileField(widget=FileInput(attrs={'name':'bottom_view'}))
    class Meta:
        model = Case
        fields = ['title', 'description', 'general_view', 'front_view','right_view', 'left_view','top_view', 'bottom_view']

class CommentForm(forms.ModelForm):
    comment = forms.CharField(widget=TextInput(attrs={'id': 'comment-box','rows':6,'cols':22, 'style': 'resize:none;width:50%;height:40px;border-top-left-radius:10px;border-bottom-left-radius:10px;border:none;',}))
    class Meta:
        model = Comment
        fields = ['comment']