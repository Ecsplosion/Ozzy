from django.shortcuts import render
from articles.models import Article, Update, OzzyService
from articles.forms import ArticleForm
from . models import CarouselImage
#MODELS
# Create your views here.

def homepage(request):
    menu = OzzyService.objects.all()
    image_list = []
    print(CarouselImage.objects.all())
    updates = Update.objects.all()
    try:
        article = Article.objects.get(displayPage='home')
    except:
        class article:
            title = 'Page Under Construction'
            description = 'Page Under Construction'
    context = {'article':article, 'image_list': CarouselImage.objects.all(), 'updates': updates, 'menu': menu}
    return render(request,'home/homepage.html',context)
def publications(request):
    menu = OzzyService.objects.all()
    try:
        article = Article.objects.get(displayPage='publications')
       
    except:
        class article:
            title = 'Page Under Construction'
            description = 'Page Under Construction'

    context = {'article':article, 'menu': menu}
    return render(request, 'home/publications.html', context)
def whatisozzy(request):
    menu = OzzyService.objects.all()
    try:
        article = Article.objects.get(displayPage='whatisozzy')
    except:
        class article:
            title = 'Page Under Construction'
            description = 'Page Under Construction'

    context = {'article':article,'menu' : menu}
    return render(request, 'home/what-is-ozzy.html',context)
def newspage(request, pk):
    menu = OzzyService.objects.all()

    try:
        update = Update.objects.get(id=pk)
    except:
        class update:
            title = 'No Updates Yet'
            description = 'No Update Description Available'
    context = {'article': update,'menu' : menu}
    return render(request, 'home/newspage.html', context)
def servicepage(request):
    menu = OzzyService.objects.all()

    try:
        article = Article.objects.get(displayPage ='ozzyservices')
    except:
        class article:
            title = 'Service Not Found'
            description = 'Service Not Found'
    context= {'article': article,'menu' : menu}
    return render(request, 'home/services.html',context)
def subservicepage(request, slug):
    menu = OzzyService.objects.all()

    article = OzzyService.objects.get(slug = slug)
    context = {'article':article, 'menu' : menu}
    return render(request, 'home/sub-services.html', context) 
def dummypage(request):
    return render(request,'home/faq.html')