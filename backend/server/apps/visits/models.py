from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Visit(models.Model):
    created_at = models.DateField(auto_now_add=True)
    browser = models.CharField(max_length=25)
    os = models.CharField(max_length=25)
    is_new = models.BooleanField(default=True)
    