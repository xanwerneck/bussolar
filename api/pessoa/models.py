from django.db import models
from django.contrib.auth.models import User

class Pessoa(models.Model):
    usuario = models.OneToOneField(to=User, on_delete=models.CASCADE)
    nome = models.CharField(max_length=255, null=True, blank=True)    
    data_nascimento = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.nome