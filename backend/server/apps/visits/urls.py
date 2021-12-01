from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from apps.visits.views import VisitViewSet

router = DefaultRouter()
router.register("visits", VisitViewSet, basename="visits")
visits_urlpatterns = [url("api/v1/", include(router.urls))]
