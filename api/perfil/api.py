from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from generic.api import AuthenticatedView, NotAuthenticatedView
from django.http.response import JsonResponse
from rest_framework import status
from perfil.models import *
from perfil.serializers import *

class PerfilApi(NotAuthenticatedView):

    def post(self, request):
        data = JSONParser().parse(request)
        perfil_serializer = PerfilSerializer(data=data)
        if perfil_serializer.is_valid():
            identificacao_individual = Tags.objects.get(categoria=Categoria.objects.get(descricao='identificacao_individual'), tag=perfil_serializer.validated_data['identificacao_individual'][0])
            competencias = Tags.objects.get(categoria=Categoria.objects.get(descricao='competencias'), tag=perfil_serializer.validated_data['competencias'][0])
            se_ve_trabalhando = Tags.objects.get(categoria=Categoria.objects.get(descricao='se_ve_trabalhando'), tag=perfil_serializer.validated_data['se_ve_trabalhando'][0])
            visao_de_mundo = Tags.objects.get(categoria=Categoria.objects.get(descricao='visao_de_mundo'), tag=perfil_serializer.validated_data['visao_de_mundo'])

            # Perfil
            perfil_tags = PerfilTag.objects.filter(
                tag__in=[identificacao_individual, competencias, se_ve_trabalhando, visao_de_mundo]
            )
            perfils = []
            for perfil_tag in perfil_tags:
                perfils.append(perfil_tag.perfil)

            # Personalidade
            personalidade_perfil = PersonalidadePerfil.objects.filter(
                perfil__in=[perf.perfil for perf in perfil_tags]
            )
            personalidade = None
            for personalidade_p in personalidade_perfil:
                personalidade = personalidade_p.personalidade

            # Habilidades
            habilidades = Habilidade.objects.filter(personalidade=personalidade)
            habilidade_serializer = HabilidadeSerializer(habilidades, read_only=True, many=True)

            data={
                'texto_personalidade' : personalidade.texto_personalidade,
                'texto_empreendedor' : personalidade.perfil_empreendedor,
                'habilidades': habilidade_serializer.data,
                'perfils' : []
            }

            perfils_ret = []
            for perfil in perfils:
                if perfil.pk not in perfils_ret:
                    perfils_ret.append(perfil.pk)
                else:
                    continue
                
                # Cursos
                cursos = CursoPerfil.objects.filter(perfil=perfil)
                curso_serializer = CursoSerializer([curso_perfil.curso for curso_perfil in cursos], read_only=True, many=True)

                # Cases
                cases = CasePerfil.objects.filter(perfil=perfil)
                case_serializer = CaseSerializer([case_perfil.case for case_perfil in cases], read_only=True, many=True)

                # Oportunidades
                oportunidades_perfil = OportunidadePerfil.objects.filter(perfil=perfil)
                oportunidades = []
                for op in oportunidades_perfil:
                    oportunidades.append(op.oportunidade)

                # Vagas
                vagas = []
                for oportunidade_vaga in oportunidades:
                    if oportunidade_vaga.vaga is not None:
                        vagas.append(oportunidade_vaga.vaga)

                # Materias
                materias = []
                for oportunidade_materia in oportunidades:
                    if oportunidade_materia.materia is not None:
                        materias.append(oportunidade_materia.materia)
                
                data_perfil = {
                    'descricao' : perfil.descricao,
                    'cursos' : curso_serializer.data,
                    'cases' : case_serializer.data,
                    'oportunidade_vagas' : VagaSerializer(vagas, read_only=True, many=True).data if len(vagas) > 0 else [],
                    'oportunidade_materias' : MateriaSerializer(materias, read_only=True, many=True).data if len(materias) > 0 else []
                }
                data['perfils'].append(data_perfil)
      


            return JsonResponse(data=data, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(data={'message': 'Erro nao tratado 2'}, status=status.HTTP_400_BAD_REQUEST)
        
