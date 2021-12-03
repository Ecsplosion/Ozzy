from django.db import models
import uuid
from froala_editor.fields import FroalaField
from . helper import generate_random_string, gen_slug
# Create your models here.
page_choices = (
    ('home','HomePage'),
    ('publications', 'OzzyPublications'),
    ('whatisozzy', 'What is Ozzy?'),
    ('ozzyservices', 'Ozzy Services'),
    ('samplecases', 'Sample Cases'),
    ('doctorstestimonial', 'Doctor\'s Testimonial'),
    ('faq','FAQ'),
    ('contactus', 'Contact Us'),
    ('none', 'None')

)
class Article(models.Model):
    title = models.CharField(max_length=150, blank=True,null=False, default='N/A', editable=True)
    description = FroalaField(default='N/A')
    displayPage = models.CharField(max_length=100, choices=page_choices, default='home', unique=True)
    id = models.UUIDField(default=uuid.uuid4,editable=False, unique=True, primary_key=True)
    def __str__(self):
        return self.title
class Update(models.Model):
    title = models.CharField(max_length=200,editable=True )
    id = models.UUIDField(default=uuid.uuid4,editable=False, primary_key=True, unique=True)
    description = FroalaField()
    date_posted = models.DateField(auto_now_add=True)
    def __str__(self) -> str:
        return self.title

class OzzyService(models.Model):
    title = models.CharField(max_length=100, editable=True)
    description = FroalaField()
    id = models.UUIDField(default=uuid.uuid4,primary_key=True,editable=False,unique=True)
    slug = models.SlugField(max_length=150, null=True, blank=True)
    def __str__(self) -> str:
        return self.title
    def save(self, *args, **kwargs):
        self.slug = gen_slug(self.title)
        super(OzzyService, self).save(*args, **kwargs)
