from django import forms
from django.db.models import fields
from django.forms.widgets import FileInput, TextInput
from . models import ThreeDCase

class ThreeDCaseForm(forms.ModelForm):
    upper_model = forms.FileField(widget=FileInput(attrs={'name':'upper_model', 'id':'upper-field'}))
    lower_model = forms.FileField(widget=FileInput(attrs={'name':'lower_model', 'id':'lower-field'}))
    ipr_form = forms.FileField(widget=FileInput(attrs={'name':'ipr_form', 'id':'ipr-field'}))
    class Meta:
        model = ThreeDCase
        fields = ['upper_model', 'lower_model', 'ipr_form']