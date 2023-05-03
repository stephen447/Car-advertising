from django.db import models
import string
import random

def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

# Create your models here.
class Advert(models.Model):
    manufacturer = models.CharField(max_length=20, default="Audi")
    year = models.IntegerField(null=False, default="2020")
    host = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    #To be added at later version
    #price = models.IntegerField(null=False, default="1000")
    #body = models.CharField(max_length=50, unique=True)
    #engine_size = models.IntegerField(null=False, default="1")
    #mileage = models.IntegerField(null=False, default="1000")
    #doors = models.IntegerField(null=False, default="4")
    #transmission = models.CharField(max_length=50, unique=True)
    #description = models.CharField(max_length=200)

