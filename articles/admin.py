from django.contrib import admin
from . models import Article, Update, OzzyService
# Register your models here.
admin.site.register(Article)
admin.site.register(Update)
admin.site.register(OzzyService)
