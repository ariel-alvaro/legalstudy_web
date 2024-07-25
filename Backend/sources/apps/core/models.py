from django.db import models

from uuid import uuid4
# Create your models here.

class BaseModel(models.Model):
    #Fields
    created = models.DateTimeField(auto_now_add=True, editable=False)
    #Relationships
    #Metadata
    class Meta:
        abstract = True
    #Methods
