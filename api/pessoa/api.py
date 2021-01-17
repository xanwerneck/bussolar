from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from generic.api import AuthenticatedView, NotAuthenticatedView
from django.http.response import JsonResponse
from rest_framework import status
from pessoa.serializers import PessoaSerializer
from pessoa.models import *

class PessoaApi(NotAuthenticatedView):
    def post(self, request):
        data = JSONParser().parse(request)
        pessoa_serializer = PessoaSerializer(data=data)
        if pessoa_serializer.is_valid():
            try:
                token = pessoa_serializer.save()
                return JsonResponse(data={'token': token}, status=status.HTTP_200_OK)
            except:
                return JsonResponse(data={'message': 'Erro ao tentar salvar dados da pessoa'}, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(data={'message': 'Erro ao cadastrar pessoa'}, status=status.HTTP_400_BAD_REQUEST)
