from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from rest_framework import generics, status
from .serializers import AdvertSerializer, CreateAdvertSerializer, DeleteAdvertSerializer, UserSerializer, LoginSerializer, SearchAdvertSerializer
from .models import Advert
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import json
from rest_framework.authtoken.models import Token

# Create your views here.
class Search(generics.ListAPIView):
    queryset = Advert.objects.all()
    serializer_class = AdvertSerializer

class AdvertView(APIView):
    serializer_class = CreateAdvertSerializer
    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            manufacturer = serializer.data.get("manufacturer")
            pr = serializer.data.get("price")
            year = serializer.data.get("year")
            engine = serializer.data.get("engine")
            mileage = serializer.data.get("mileage")
            location = serializer.data.get("location")
            fuel = serializer.data.get("fuel")
            transmission = serializer.data.get("transmission")
            colour = serializer.data.get("colour")
            doors = serializer.data.get("doors")
            description = serializer.data.get("description")

            if request.user.is_authenticated:
                un = request.user.username

            host = self.request.session.session_key
            advert = Advert(username=un, manufacturer=manufacturer, year=year, engine=engine, mileage=mileage, location=location, fuel=fuel, transmission=transmission, colour=colour, doors=doors, description=description, price=pr)
            advert.save()
            return Response(AdvertSerializer(advert).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        manufacturer = request.GET.get('manufacturer')
        maxyear = request.GET.get('maxyear')
        minyear = request.GET.get('minyear')
        maxprice = request.GET.get('maxprice')
        minprice = request.GET.get('minprice')
        transmission = request.GET.get('transmission')
        maxmileage = request.GET.get('maxmileage')
        adverts = Advert.objects.filter(manufacturer=manufacturer, year__lte=maxyear, year__gt=minyear, price__lte=maxprice,
        price__gt=minprice, transmission=transmission, mileage__lte=maxmileage)
        if len(adverts) > 0:
                data = AdvertSerializer(adverts, many=True).data
                return Response(data, status=status.HTTP_200_OK)
        return Response({'No adverts found for given manufacturer'}, status=status.HTTP_200_OK)

        







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
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = SearchAdvertSerializer(data=request.data)
        if serializer.is_valid():
            manufacturer = serializer.data.get("manufacturer")
            maxyear = serializer.data.get("maxyear")
            minyear = serializer.data.get("minyear")
            maxprice = serializer.data.get("maxprice")
            minprice = serializer.data.get("minprice")
            transmission = serializer.data.get("transmission")
            maxmileage = serializer.data.get("maxmileage") 
            adverts = Advert.objects.filter(manufacturer=manufacturer, year__lt=maxyear)# year__gte=minyear,
            #price__gte=minprice, price__lt=maxprice, transmission=transmission, mileage__lte=maxmileage)
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

class UserCreate(APIView):
    def post(self, request, format = 'json'):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    def post(self, request, format=None):
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid():
            un = serializer.data.get("username")
            pw =serializer.data.get("password")
            
            if request.user.is_authenticated:
                    return Response("Login already Sucessful", status=status.HTTP_200_OK)
            else:
                user = authenticate(request, username=un, password=pw)
                if user is not None:
                    login(request, user)
                    return Response("Login Sucessful", status=status.HTTP_200_OK)
                else: 
                    return Response("Login Unsucessful", status=status.HTTP_401_UNAUTHORIZED)
    
    def get(self, request, format=None):
        resp={}
        if request.user.is_authenticated:
            un = request.user.username
            em = request.user.email
            resp["error"] = False
            resp['username'] = un
            resp['email'] = em
            return JsonResponse(resp, status=status.HTTP_200_OK)
        else:
            resp["error"] = True
            return JsonResponse(resp, status=status.HTTP_401_UNAUTHORIZED)
    
    def patch(self, request, format=None):
        if request.user.is_authenticated:
            logout(request)
            return Response("Logout sucessful", status=status.HTTP_200_OK)
        else:
            return Response("Logout unsucessful", status=status.HTTP_400_BAD_REQUEST)



