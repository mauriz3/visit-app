from django.db import models

class Visit(models.Model):
    created_at = models.DateField(auto_now_add=True)
    browser = models.CharField(max_length=25)
    os = models.CharField(max_length=25)
    is_new = models.BooleanField(default=True)
    