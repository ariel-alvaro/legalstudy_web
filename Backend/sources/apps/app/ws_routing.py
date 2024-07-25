from django.urls import re_path
from . import ws_consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_uuid>[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/$', ws_consumers.ChatConsumer.as_asgi()),
    re_path("ws/admin/", ws_consumers.AdminConsumer.as_asgi())
]


