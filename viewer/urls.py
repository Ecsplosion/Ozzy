from django.urls import path
from . import views
urlpatterns = [
    path('',views.viewerpage, name='ViewerPage'),
    path('responsive/', views.responsiveviewerpage, name='ResponsiveViewerPage')
]