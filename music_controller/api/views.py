from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from rest_framework import generics, status
from .serializers import AdvertSerializer, CreateAdvertSerializer, DeleteAdvertSerializer
from .models import Advert
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import json

# Create your views here.
class Search(generics.ListAPIView):
    queryset = Advert.objects.all()
    serializer_class = AdvertSerializer

class CreateAdvertView(APIView):
    serializer_class = CreateAdvertSerializer
    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            manufacturer = serializer.data.get("manufacturer")
            year = serializer.data.get("year")
            host = self.request.session.session_key
            advert = Advert(host=host, manufacturer=manufacturer, year=year)
            advert.save()
            return Response(AdvertSerializer(advert).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

class DeleteAdvertView(APIView):
    serializer_class = DeleteAdvertSerializer
    def get(self, request, format=None):
        #if not self.request.session.exists(self.request.session.session_key):
        #    self.request.session.create()
        #serializer = self.serializer_class(data=request.data)
        #if serializer.is_valid():
        #    id = serializer.data.get("id")
        id = request.GET.get('id')
        ad = Advert.objects.filter(id=id)
        if len(ad)==1:
            ad.delete()
            return Response("Ad "+id+" deleted sucessfully", status=status.HTTP_200_OK)
        return Response("Ad could not be deleted", status = status.HTTP_200_OK )


class SearchAdverts(APIView):
    serializer_class = CreateAdvertSerializer
    def get(self, request, format=None):
        manufacturer = request.GET.get('manufacturer')
        year = request.GET.get('year')
        if manufacturer != None:
            adverts = Advert.objects.filter(manufacturer=manufacturer, year=year)
            if len(adverts) > 0:
                data = AdvertSerializer(adverts, many=True).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'No adverts found for given manufacturer'}, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class MyadsView(APIView):
    serializer_class = CreateAdvertSerializer
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        host = self.request.session.session_key
        adverts = Advert.objects.filter(host=host)
        if len(adverts) > 0:
            data = AdvertSerializer(adverts, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        return Response({'No adverts found for given manufacturer'}, status=status.HTTP_200_OK)

class UserView(APIView):
    def register(self, request, format=None):
        return None

