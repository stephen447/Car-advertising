from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Advert
from django.contrib.auth.models import User

class AdvertSerializer(serializers.ModelSerializer):
    #image = serializers.ImageField(required=False)
    class Meta:
        model = Advert
        fields = ('id', 'manufacturer', 'year', 'username', 'engine', 'mileage', 'location', 'fuel', 'transmission', 'colour', 'doors', 'description', 'price', 'image1', 'image2', "image3", "image4", "image5")

class CreateAdvertSerializer(serializers.ModelSerializer):
    #image = serializers.ImageField(required=False)
    many=True
    class Meta:
        model = Advert
        fields = ('id', 'manufacturer', 'year', 'engine', 'mileage', 'location', 'fuel', 'transmission', 'colour', 'doors', 'description', 'price', 'image1', 'image2', "image3", "image4", "image5")

class SearchAdvertSerializer(serializers.Serializer):
    class Meta:
        fields = ('manufacturer', 'maxyear', 'minyear' 'maxmileage', 'transmission', 'maxprice','minprice')

class DeleteAdvertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advert
        fields = ('id')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
    email = serializers.EmailField(required=True, validators = [UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(required=True, validators = [UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=6, max_length=50)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
    
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=6, max_length=50)
    
    