from unicodedata import name
from django.urls import path
from . import views
urlpatterns = [
    path('',views.viewerpage, name='ViewerPage'),
    path('responsive/', views.responsiveviewerpage, name='ResponsiveViewerPage'),
    path('responsive/<str:pk>/', views.viewpage, name='ViewPage'),
    path('submit-case/', views.submitcase, name='SubmitFormPage'),
    path('login/', views.loginpage, name='CaseLoginPage'),
    path('submit-case/success/<str:pk>/', views.successpage, name='SuccessPage')
]