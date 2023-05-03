from django.urls import path
from .views import Search, SearchAdverts, MyadsView, DeleteAdvertView
from .views import CreateAdvertView

urlpatterns = [
    path('search1', Search.as_view()),
    path('advertise', CreateAdvertView.as_view()),
    path('search', SearchAdverts.as_view()),
    path('myads', MyadsView.as_view()),
    path('delete', DeleteAdvertView.as_view())
    
]