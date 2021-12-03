from django.shortcuts import redirect, render
from articles.models import Article, OzzyService
from . forms import ArticleForm, UpdateForm, OzzyServiceForm
from home.models import CarouselImage
menu = OzzyService.objects.all()
# Create your views here.
def deletepage(request,pk):
    article = Article.objects.get(id=pk)
    if request.method == 'POST':
        article.delete()
        return redirect('CreatePage')
    context = {'form': article, 'menu': menu}
    return render(request,'articles/delete-article.html',context)
def editpage(request, pk):
    article = Article.objects.get(id=pk)
    form = ArticleForm(instance=article)
    if request.method == 'POST':
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid:
            form.save()
            return redirect('CreatePage')
    context={'form': form, 'menu': menu}
    return render(request, 'articles/edit-article.html',context,)
def createpage(request):
    article_list = []
    for i in Article.objects.all():
        article_list.append(i)
    if request.method == 'POST':
        images = request.FILES.getlist('carousel-images')
        for image in images:
            CarouselImage.objects.create(
                image = image
            )
    context = {'alist': article_list, 'menu': menu}
    return render(request, 'articles/article.html', context)
def createarticlepage(request):
    form = ArticleForm()
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('CreatePage')
        else:
            print(form.errors)
    context = {'form': form, 'menu': menu}
    return render(request, 'articles/create-article.html', context)
def postupdatepage(request):
    form = UpdateForm()
    if request.method == 'POST':
        form = UpdateForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('CreatePage')
    context = {'form': form}
    return render(request, 'articles/post-update.html', context)
def createozzyservice(request):
    form = OzzyServiceForm()
    if request.method == 'POST':
        form = OzzyServiceForm(request.POST)
        form.save()
        return redirect('CreatePage')
    context = { 'form': form,'menu': menu}
    return render(request, 'articles/create-ozzy-service.html', context)