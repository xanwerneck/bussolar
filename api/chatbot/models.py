from django.db import models

class Resposta(models.Model):
    mensagem = models.TextField(null=True, blank=True)
    arquivo = models.FileField(null=True, blank=True, upload_to='static/respostas/imagens')

    def __str__(self):
        return self.mensagem if self.mensagem else 'Imagem anexada'

class Intent(models.Model):
    intent = models.CharField(max_length=50)
    resposta = models.ForeignKey(to=Resposta, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.intent
