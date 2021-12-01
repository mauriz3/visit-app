from rest_framework import serializers
from apps.visits.models import Visit


class VisitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Visit
        read_only_fields = (
            "id",
            "created_at"
        )
        fields = (
            "id",
            "created_at",
            "browser",
            "os",
            "is_new"
        )
