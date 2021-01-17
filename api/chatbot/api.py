from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from generic.api import AuthenticatedView, NotAuthenticatedView
from django.http.response import JsonResponse
from rest_framework import status
from chatbot.models import *
from chatbot.serializers import RespostaSerializer

class IntentApi(AuthenticatedView):
    def get(self, request, intent_str=None):
        try:
            intent_obj = Intent.objects.get(intent=intent_str)
            resposta = RespostaSerializer(intent_obj.resposta)
            return JsonResponse(data={
                    'message' : resposta.data
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse(data={'message': 'Resposta não localizada', 'error' : str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
