from django.urls import path
from . import views
urlpatterns = [
    path('list/',views.createpage, name='CreatePage'),
    path('create/', views.createarticlepage, name='CreateArticlePage'),
    path('edit/<str:pk>/', views.editpage, name='EditPage'),
    path('delete/<str:pk>/', views.deletepage, name='DeletePage'),
    path('create-update/', views.postupdatepage, name='PostUpdatePage'),
    path('create-ozzy-service/', views.createozzyservice, name='CreateServicePage')

]