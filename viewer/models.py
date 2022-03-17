from operator import mod
from pyexpat import model
from django.db import models
import uuid
from django.contrib.auth.models import User
# Create your models here.
class ThreeDCase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    upper_model = models.FileField(null=True, blank=True)
    lower_model = models.FileField(null=True, blank=True)
    ipr_form = models.FileField(null=True, blank=True)
