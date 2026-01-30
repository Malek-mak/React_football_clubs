from django.contrib import admin
from .models import Country, League, Characteristic, FootballClubs


admin.site.register(Country)
admin.site.register(League)
admin.site.register(Characteristic)
admin.site.register(FootballClubs)