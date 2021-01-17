from rest_framework import serializers
from chatbot.models import *

class RespostaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resposta
        fields = ['mensagem', 'arquivo'] 