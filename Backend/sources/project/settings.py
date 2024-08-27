from pathlib import Path
from decouple import config
import os 

from apps.core.enumerations import Environment

APP_VERSION = "1.0.0"
ENVIRONMENT = config('ENVIRONMENT', default=Environment.Development)
BASE_DIR = Path(__file__).resolve().parent.parent


if ENVIRONMENT == Environment.Development:
    SECRET_KEY = 'SK'
    DEBUG = True
    ALLOWED_HOSTS = ["*"]
else:
    SECRET_KEY = config('SECRET_KEY', default=None)
    DEBUG = False
    ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='').split(',')


# Application definition

INSTALLED_APPS = [
    'daphne',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'channels',
    'corsheaders',
    'apps.core',
    'apps.app',
    
]

ASGI_APPLICATION = 'project.asgi.application'


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.common.CommonMiddleware'
    
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'


# Database

BD_ENGINE = config('BD_ENGINE', default='django.db.backends.sqlite3')

if BD_ENGINE == 'django.db.backends.sqlite3':
    if ENVIRONMENT == Environment.Production:
        raise Exception("sqlite3 db engine can't be used in production environment!. You must set the 'BD_ENGINE' in .env file.")
    BD_NAME = os.path.join(BASE_DIR, 'db.sqlite3')
else:
    BD_NAME = config('BD_NAME')

DATABASES = {
    'default': {
        'ENGINE': BD_ENGINE,
        'NAME': BD_NAME,
        'USER': config('BD_USER', default=None), # Not used with sqlite3.
        'PASSWORD': config('BD_PASSWORD', default=None), # Not used with sqlite3.
        'HOST': 'mysql', # Set to empty string for localhost. Not used with sqlite3.
        'PORT': config('BD_PORT', default=''), # Set to empty string for default. Not used with sqlite3.
    }
}

# Password validation


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

STATIC_URL = 'static/'

# Default primary key field type

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Authentication Token
TOKEN_EXPIRATION_DAYS = 6

#CORS
if (ENVIRONMENT == Environment.Development):
    CORS_ALLOW_CREDENTIALS = True
    CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', default='http://estudiojuridicoad.com').split(',')
    CORS_ALLOW_ALL_ORIGINS = True
# ---------------------------------CHANNEL---------------------------------


CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('redis', 6379)],
        },
        # 'ROUTING': 'backend.routing.channel_routing',
    }
}

# LOGS CONFIGURATION

LOGS = {
    "PATH": os.path.join(BASE_DIR, "logs")
}

SESSION_COOKIE_SECURE = True  # Puede ser False en desarrollo
CSRF_COOKIE_SECURE = False  
SESSION_COOKIE_DOMAIN = 'estudiojuridicoad.com'
CSRF_COOKIE_DOMAIN = 'estudiojuridicoad.com'
CSRF_TRUSTED_ORIGINS = ['http://estudiojuridicoad.com', 'https://estudiojuridicoad.com']

#TIME ZONE
TIME_ZONE = 'America/Argentina/Buenos_Aires'
USE_TZ = True
