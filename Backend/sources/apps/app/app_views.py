from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, CreateAPIView, ListAPIView, DestroyAPIView
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .controllers.execute import processCalculo
from rest_framework.authentication import SessionAuthentication
from apps.core.auth_views import TokenAuthCookie
from django.utils import timezone
from django.db.models import Sum
from django.shortcuts import get_object_or_404
#Models
from . import models
from . import app_serializers
from datetime import datetime
# Create your views here.
from . import enums
## Calculo Views
class Calculo(RetrieveAPIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            print(request.data)

            data = processCalculo(request.data)
            
            return Response(data)   
        
        except Exception as exception:
            #Do logger class for this
            pass

## Register views
class RegisterRetrieveTotalAPIView(RetrieveAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthCookie]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            total_visits = models.Register.objects.all().aggregate(total=Sum("visited"))["total"]

            return Response({"total":total_visits}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"detail":"An error has occurred"}, status=status.HTTP_400_BAD_REQUEST)

class RegisterRetrieveAPIView(RetrieveAPIView):

    authentication_classes = [SessionAuthentication, TokenAuthCookie]
    permission_classes = [IsAuthenticated]
    queryset = models.Register.objects.all()
    serializer_class = app_serializers.RegisterRetrieveSerializer

    def get_object(self):
        
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, date=datetime.now().strftime("%Y-%m-%d"))
        return obj
    



class RegisterCreateAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = app_serializers.RegisterCreateSerializer

    def create(self, request, *args, **kwargs):
        try:
            date = datetime.now().strftime("%Y-%m-%d")
            # print(date, flush=True)
            register = models.Register.objects.filter(date = date).first()
            
            if (register):
                print("existe",flush=True)
                visited = register.visited + 1
                data = {"visited":visited}
                serializer = self.get_serializer(register, data = data, partial=True)

                if(serializer.is_valid(raise_exception=True)):

                    serializer.save()
                    return Response({}, status=status.HTTP_201_CREATED)

            data = {"date": date}
            serializer = self.get_serializer(data = data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail":"An error has occurred"}, status=status.HTTP_400_BAD_REQUEST)
## Chat Views

class ChatCreateAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = app_serializers.ChatSerializer


class ChatRetrieveAPIView(RetrieveAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthCookie]
    permission_classes = [IsAuthenticated]

    lookup_field = 'roomID'
    queryset = models.Chat.objects.all()
    serializer_class = app_serializers.ChatSerializer

class ChatDeleteAPIView(DestroyAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthCookie]
    permission_classes = [IsAuthenticated]

    lookup_field = "roomID"
    queryset = models.Chat.objects.all()
    
class ChatDeleteAllAPIView(DestroyAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthCookie]
    permission_classes = [IsAuthenticated]

    queryset = models.Chat.objects.all()

    def delete(self, request, *args, **kwargs):
        try:
            chats = self.get_queryset().delete()

            return Response({}, status=status.HTTP_204_NO_CONTENT)
    
        except Exception as e:
            return Response({"detail":"An error has occurred"}, status=status.HTTP_400_BAD_REQUEST)



class ChatListAPIView(ListAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthCookie]
    permission_classes = [IsAuthenticated]

    queryset = models.Chat.objects.all()
    serializer_class = app_serializers.ChatSerializer

class ChatCounterRetrieveAPIView(RetrieveAPIView):
    authentication_classes = [SessionAuthentication, TokenAuthCookie]
    permission_classes = [IsAuthenticated]
    def get(self, request):

        try:
            data = {
                "chats_on": models.Chat.objects.filter(status=enums.ChatStatus.Open).count(),
                "chats_off": models.Chat.objects.filter(status=enums.ChatStatus.Closed).count()
            }

            return Response(data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"detail":"An error has occurred"}, status=status.HTTP_400_BAD_REQUEST)




        

    
