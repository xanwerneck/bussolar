from django.urls import path
from pessoa import api as api_pessoa
from chatbot import api as api_chatbot
from perfil import api as api_perfil

urlpatterns = [
 path('acesso', api_pessoa.PessoaApi.as_view()),
 path('intent/<str:intent_str>', api_chatbot.IntentApi.as_view()),
 path('perfil', api_perfil.PerfilApi.as_view())
]