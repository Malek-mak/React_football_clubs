from django.db import models

class Country(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.name
    
    
    
class League(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.name
    
class Characteristic(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.name
    
class FootballClubs(models.Model):
    name = models.CharField(unique=True, max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    description = models.CharField(max_length=1000)
    attendence = models.IntegerField(null=True)
    city = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    characteristics = models.ManyToManyField(Characteristic)
    
    def __str__(self):
        return self.name