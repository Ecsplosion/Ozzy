from django.urls import path, include
from . import views
urlpatterns = [
    path('faq/', views.dummypage),
    path('',views.homepage, name='HomePage'),
    path('user/', include('users.urls')),
    path('article/', include('articles.urls')),
    path('dashboard/', include('cases.urls')),
    path('publications/', views.publications, name='PublicationsPage'),
    path('what-is-ozzy/', views.whatisozzy, name='WhatIsOzzyPage'),
    path('news/<str:pk>/', views.newspage, name='NewsPage'),
    path('services/', views.servicepage, name='ServicePage'),
    path('services/<str:slug>/', views.subservicepage, name='SubServicePage')
]
