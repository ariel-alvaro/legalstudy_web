
from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from .auth_utils import token_handler
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from django.http import Http404


class TokenAuthCookie(TokenAuthentication):
    def authenticate(self, request):

        if ("tkv1" in request.COOKIES) and 'HTTP_AUTHORIZATION' not in request.META:
            
            return self.authenticate_credentials(request.COOKIES.get('tkv1'))
        
        return super().authenticate(request)

class AuthViewSet(GenericViewSet):


    @action(methods=["POST"], detail=False, permission_classes = [AllowAny])
    def login(self, request):
        try:
                
            user = get_object_or_404(User, username = request.data["username"])
            
            if not user.check_password(request.data["password"]):
                return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
            
            token, created = Token.objects.get_or_create(user=user)
            
            #Renew if expired token
            if (created == False):
                token = token_handler(token)

            serializer = serializers.UserSerializer(instance=user)
        
            response = Response({"token": token.key, "user": serializer.data})

            response.set_cookie(
                key='tkv1',
                value=token.key,
                max_age=60*60*24*6,  # 6 days valid
                httponly=True,  
                secure=False,
                samesite='lax'
            )
            return response
        
        except Http404:
                return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"detail": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)
    
    
    @action(methods=["GET"], detail=False, authentication_classes = [SessionAuthentication, TokenAuthCookie],permission_classes = [IsAuthenticated])
    def verify(self, request):
        return Response({"detail":"Valid token."}, status = status.HTTP_200_OK)