from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

class AuthenticatedView(APIView):
    permission_classes = (
     IsAuthenticated,)


class NotAuthenticatedView(APIView):
    permission_classes = (
     AllowAny,)
