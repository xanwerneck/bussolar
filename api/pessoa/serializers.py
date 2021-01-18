from rest_framework import serializers
from django.contrib.auth.models import User
from pessoa.models import *
from rest_framework.authtoken.models import Token

class PessoaSerializer(serializers.Serializer):
    nome = serializers.CharField()
    email = serializers.CharField()
    data_nascimento = serializers.DateField()

    def save(self):

        try:
            user = User.objects.get(email=self.validated_data['email'])
        except:
            user = User.objects.create(username=self.validated_data['email'],
                                    email=self.validated_data['email'],
                                    password='XXaaBUSSOL@R')
        
        
        pessoa, created = Pessoa.objects.get_or_create(usuario=user)
        pessoa.usuario = user
        pessoa.nome = self.validated_data['nome']
        pessoa.data_nascimento = self.validated_data['data_nascimento']
        pessoa.save()    

        token, created = Token.objects.get_or_create(user=user)

        return token.key
