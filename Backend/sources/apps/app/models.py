from django.db import models
from apps.core.models import BaseModel
from uuid import uuid4
from .enums import ChatStatus
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .enums import WSNotificationType
from django.conf import settings
# Create your models here.
#chat 1----* messages 
#cliente 1 --- 1 chat

class Chat(BaseModel):
    #Fields
    roomID = models.UUIDField(primary_key=True, unique=True, editable=False, default=uuid4)
    status = models.CharField(max_length=5, default=ChatStatus.Request)
    #Relationships
    #Metadata
    #Methods
    
    # Notify admin that a chat has changed
    def notify_changes(self, status):

        channel_layer = get_channel_layer()

        # Send message to room group
        async_to_sync(channel_layer.group_send)(
            'admin',
            {
                'type': 'receive_from_group',
                'notification_type': status
            }
        )
    
    def save(self, *args, **kwargs): 
       
        if (self.status != ChatStatus.Request):
            self.notify_changes(self.status) 

           

        return super().save(*args, **kwargs)

class Message(BaseModel):
    #Fields
    user_type = models.CharField(max_length=6)
    text = models.CharField(max_length=500)
    #Relationships
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
    #Metadata
    #Methods


class Client(models.Model):
    #Fields
    name = models.CharField(max_length=32, blank=True)
    cellphone = models.PositiveIntegerField(blank=True)
    #Relationships
    chat = models.OneToOneField(Chat, on_delete=models.CASCADE, related_name='client')
    #Metadata
    #Methods


class Register(models.Model):
    date = models.DateField()
    visited = models.PositiveIntegerField(default=1)

    