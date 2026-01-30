from django.urls import path
from. import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()


router.register('country', views.ContryViewSet, basename='country')
router.register('league', views.LeagueViewSet, basename='league')
router.register('characteristic', views.CharacterViewSet, basename='characteristic')
router.register('Clubs', views.ClubViewSet, basename='clubs')


urlpatterns = router.urls
