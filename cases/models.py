from django.db import models
from froala_editor.fields import FroalaEditor, FroalaField
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
import uuid

# Create your models here.
class Case(models.Model):
    comments = models.ForeignKey("Comment", blank=True, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=200, blank=True, null=True)
    description = FroalaField()
    date_created = models.DateField(auto_now_add=True)
    general_view = models.FileField(null=True,validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'WMV'])])
    front_view = models.FileField(null=True,validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'WMV'])])
    left_view = models.FileField(null=True,validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'WMV'])])
    right_view = models.FileField(null=True,validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'WMV'])])
    top_view = models.FileField(null=True,validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'WMV'])])
    bottom_view = models.FileField(null=True,validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv', 'WMV'])])
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    id = models.UUIDField(default=uuid.uuid4, primary_key=True,editable=False,unique=True)
    def __str__(self):
        return self.title
class Comment(models.Model):
    related_case = models.ForeignKey(Case, on_delete=models.CASCADE)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    date_posted = models.DateField(auto_now_add=True)
    comment = models.TextField(max_length=1000,blank=True,null=True)
    id = models.UUIDField(default=uuid.uuid4,unique=True, editable=False, primary_key=True)
    def __str__(self) -> str:
        return self.comment