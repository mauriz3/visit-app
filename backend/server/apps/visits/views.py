from rest_framework import viewsets
from apps.visits.models import Visit
from apps.visits.serializers import VisitSerializer
from django_filters import rest_framework as filters


class VisitFilter(filters.FilterSet):
    start_date = filters.DateFilter(field_name='created_at', lookup_expr="gte")
    end_date = filters.DateFilter(field_name='created_at', lookup_expr="lte")
    browser = filters.CharFilter(lookup_expr='icontains')
    os = filters.CharFilter(lookup_expr='icontains')
    is_new = filters.BooleanFilter()


class VisitViewSet(viewsets.ModelViewSet):

    serializer_class = VisitSerializer
    queryset = Visit.objects.all().order_by('created_at')
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = VisitFilter
    authentication_classes = [] #disables authentication
    permission_classes = [] #disables permission

    def get_queryset(self):
        return self.queryset
