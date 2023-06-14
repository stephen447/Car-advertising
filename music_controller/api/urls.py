from django.urls import path
from .views import Search, SearchAdverts, MyadsView, DeleteAdvertView, AdvertView, UserCreate, UserLogin


urlpatterns = [
    path('search1', Search.as_view()),
    path('advertise', AdvertView.as_view()),
    path('search', SearchAdverts.as_view()),
    path('myads', MyadsView.as_view()),
    path('delete', DeleteAdvertView.as_view()),
    path('createuser', UserCreate.as_view()),
    path('login', UserLogin.as_view())
    
]