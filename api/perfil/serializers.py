from rest_framework import serializers
from django.contrib.auth.models import User
from perfil.models import *


class PerfilSerializer(serializers.Serializer):
    identificacao_individual = serializers.ListField()
    competencias = serializers.ListField()
    se_ve_trabalhando = serializers.ListField()
    visao_de_mundo = serializers.CharField()
    saber_o_que_fazer = serializers.CharField()
    focar_ideia = serializers.CharField()

class CaseSerializer(serializers.Serializer):
    class Meta:
        model = Case
        fields = ["link", "titulo", "personalidade"]

class HabilidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habilidade
        fields = ["descricao", "valor"]

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = ["link", "titulo", "fornecedor", "valor", "duracao"]

class VagaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vaga
        fields = ["descricao", "salario"]

class MateriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materia
        fields = ["titulo", "fonte", "link"]

##
##class PerfilSerializer(serializar.ModelSerializer):
##    class Meta:
##        model = Perfil
##
##class HabilidadeSerializer(serializers.ModelSerializer):
##    class Meta:
##        model = Habilidade
##
##class CaseSerializer(serializers.ModelSerializer):
##    class Meta:
##        model = Case
##        
##class FornecedorSerializer(serializers.ModelSerializer):
##    class Meta:
##        model = Fornecedor
##
##class CursoSerializer(serializers.ModelSerializer):
##    class Meta:
##        model = Curso
##
##class VagaSerializer(serializers.ModelSerializer):
##    class Meta:
##        model = Vaga
##
##class MateriaSerializer(serializers.ModelSerializer):
##    class Meta:
##        model = Materia
##
##class OportunidadeSerializer(serializers.ModelSerializer):
##    class Meta:
##        model = Oportunidade