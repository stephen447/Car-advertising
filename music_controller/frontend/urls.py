from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('search', index),
    path('advertise', index),
    path('myads', index)
]