from collections import namedtuple
from django.urls import path
from . import views
urlpatterns = [
    path('',views.dashboard, name='DashboardPage'),
    path('my-cases/', views.casespage, name='MyCasesPage'),
    path('submit-case/', views.submitcasepage, name='SubmitPage'),
    path('case/<str:pk>/', views.casepage, name='CasePage'),
    path('case-model/', views.case_model, name='CaseModelPage'),
    path('case-detail/', views.publiccases, name='PubliCasesPage'),
    path('case-detail/<str:pk>/', views.publiccase, name='PublicCasePage'),
    path('api/chart/data/<str:pk>/', views.ChartData.as_view(), name='chart-data')
]