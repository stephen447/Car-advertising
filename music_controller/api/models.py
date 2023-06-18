from django.db import models
import string
import random

def generate_unique_code():
    length = 6
    return length

# Create your models here.
class Advert(models.Model):
    manufacturer = models.CharField(max_length=20, default="Audi")
    year = models.IntegerField(null=False, default="2020")
    host = models.CharField(max_length=50)
    #created_at = models.DateTimeField(auto_now_add=True)
    #To be added at later version
    image = models.ImageField(null = True, blank=True, upload_to="images/")
    price = models.IntegerField(null=False, default="0")
    engine = models.IntegerField(null=False, default="1")
    mileage = models.IntegerField(null=False, default="1000")
    doors = models.IntegerField(null=False, default="4")
    transmission = models.CharField(max_length=50, default="Manual")
    description = models.CharField(max_length=200, default="")
    location = models.CharField(max_length=20, default="Dublin")
    fuel = models.CharField(max_length=10, default="Petrol")
    colour = models.CharField(max_length=10, default="Black")
    username = models.CharField(max_length=50, default="")

