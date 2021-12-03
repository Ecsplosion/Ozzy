from django.db import models
import uuid
from froala_editor.fields import FroalaField
# Create your models here.
class CarouselImage(models.Model):
    id = models.UUIDField(default=uuid.uuid4,editable=False, primary_key=True, unique=True)
    image = models.ImageField(blank=True, null=True)
