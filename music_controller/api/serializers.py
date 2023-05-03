from rest_framework import serializers
from .models import Advert

class AdvertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advert
        fields = ('id', 'manufacturer', 'year', 'created_at', 'host')

class CreateAdvertSerializer(serializers.ModelSerializer):
    many=True
    class Meta:
        model = Advert
        fields = ('manufacturer', 'year')

class DeleteAdvertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advert
        fields = ('id')