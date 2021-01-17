from django.db import models
from django.contrib.auth.models import User

class Categoria(models.Model):
    descricao = models.CharField(max_length=255)
    def __str__(self):
        return self.descricao

class Tags(models.Model):
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    tag = models.CharField(max_length=50)
    def __str__(self):
        return self.categoria.descricao + ' - ' + self.tag

class Personalidade(models.Model):
    descricao = models.CharField(max_length=255)
    texto_personalidade = models.TextField(null=True, blank=True)
    perfil_empreendedor = models.TextField(null=True, blank=True)

class Habilidade(models.Model):
    descricao = models.CharField(max_length=255, default='')
    personalidade = models.ForeignKey(to=Personalidade, on_delete=models.CASCADE, null=True, blank=True)
    valor  = models.IntegerField()

class Perfil(models.Model):
    descricao = models.CharField(max_length=255)
    identificador = models.CharField(max_length=150)   

    def __str__(self):
        return self.descricao

class PersonalidadePerfil(models.Model):
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE)
    personalidade = models.ForeignKey(Personalidade, on_delete=models.CASCADE)

class PerfilTag(models.Model):
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tags, on_delete=models.CASCADE)
    def __str__(self):
        return self.perfil.descricao + ' - ' + self.tag.categoria.descricao + ' - ' + self.tag.tag

class Case(models.Model):
    link = models.URLField(null=True, blank=True)
    titulo = models.CharField(max_length=255)
    personalidade = models.CharField(max_length=255)

class CasePerfil(models.Model):
    case = models.ForeignKey(Case, on_delete=models.CASCADE)
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE)

class Fornecedor(models.Model):
    nome = models.CharField(max_length=255)
    logo = models.FileField(null=True, blank=True)
    def __str__(self):
        return self.nome

class Curso(models.Model):
    link = models.URLField(null=True, blank=True)
    titulo = models.CharField(max_length=255)
    fornecedor = models.ForeignKey(to=Fornecedor, null=True, blank=True, on_delete=models.CASCADE)
    valor = models.FloatField(default=0.0, null=True, blank=True)
    duracao = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.titulo

class CursoPerfil(models.Model):
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE)

class Vaga(models.Model):
    fornecedor = models.ForeignKey(to=Fornecedor, null=True, blank=True, on_delete=models.CASCADE)
    descricao = models.TextField()
    salario = models.FloatField(null=True, blank=True)

class Materia(models.Model):
    titulo = models.CharField(max_length=255)
    fonte = models.CharField(max_length=255)
    link = models.URLField(null=True, blank=True)

class Oportunidade(models.Model):
    vaga = models.ForeignKey(to=Vaga, null=True, blank=True, on_delete=models.CASCADE)
    materia = models.ForeignKey(to=Materia, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return 'VAGA - ' + self.vaga.descricao if self.vaga else 'MATERIA - ' + self.materia.titulo

class OportunidadePerfil(models.Model):
    oportunidade = models.ForeignKey(Oportunidade, on_delete=models.CASCADE)
    perfil = models.ForeignKey(Perfil, on_delete=models.CASCADE)