from django.forms import fields
from . models import Article, Update, OzzyService
from django import forms
from froala_editor.widgets import FroalaEditor
class ArticleForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'name': 'article_title', 'placeholder': 'Enter Title'}))
    description = forms.CharField(widget=FroalaEditor)
    class Meta:
        model = Article
        fields = ['title', 'description','displayPage']

class UpdateForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'name': 'article_title', 'placeholder': 'Enter Title'}))
    description = forms.CharField(widget=FroalaEditor)
    class Meta:
        model = Update
        fields = '__all__'
class OzzyServiceForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={'name': 'article_title', 'placeholder': 'Enter Title'}))
    description = forms.CharField(widget=FroalaEditor)
    class Meta:
        model = OzzyService
        fields = ['title', 'description']