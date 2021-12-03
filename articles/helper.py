from django.utils.text import slugify
import string
import random

def generate_random_string(N):
    res = ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))
    return res

def gen_slug(text):
    new_slug = slugify(text)
    from . models import OzzyService
    if OzzyService.objects.filter(slug= new_slug).exists():
        return gen_slug(text + generate_random_string(5))
    return new_slug