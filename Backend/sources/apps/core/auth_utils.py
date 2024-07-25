from rest_framework.authtoken.models import Token

from datetime import timedelta
from django.utils import timezone
from django.conf import settings

def token_expired(token):
    time_elapsed = timezone.now() - token.created
    time_left = timedelta(days = settings.TOKEN_EXPIRATION_DAYS) - time_elapsed

    return time_left

# Renew the token (not the traditional refresh token)
def token_handler(token):
    tokem_time_left = token_expired(token)

    if tokem_time_left < timedelta(seconds = 0):

        token.delete()  
        new_token = Token.objects.create(user = token.user)
        return new_token
    
    return token