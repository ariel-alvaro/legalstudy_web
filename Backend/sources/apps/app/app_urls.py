from rest_framework import routers
from django.urls import path
from . import app_views


router = routers.DefaultRouter()

urlpatterns = [
    path("calculo", app_views.Calculo.as_view(), name="calculo"),
    path("chat_create", app_views.ChatCreateAPIView.as_view(), name="chat-create"),
    path("chat_retrieve/<uuid:roomID>", app_views.ChatRetrieveAPIView.as_view(), name="chat-retrieve"),
    path("chat_list", app_views.ChatListAPIView.as_view(), name="chatlist"),
    path("chat_count", app_views.ChatCounterRetrieveAPIView.as_view(), name="chat-count"),
    path("chat_delete/<uuid:roomID>", app_views.ChatDeleteAPIView.as_view(), name="chat-delete"),
    path("chat_delete_all", app_views.ChatDeleteAllAPIView.as_view(), name="chat-delet-eall"),
    path("register_create", app_views.RegisterCreateAPIView.as_view(), name="register-create"),
    path("register_retrieve", app_views.RegisterRetrieveAPIView.as_view(), name="register-retrieve"),
    path("register_retrieve_total", app_views.RegisterRetrieveTotalAPIView.as_view(), name="register-retrieve-total")
]

