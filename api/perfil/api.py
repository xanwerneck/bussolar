from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from generic.api import AuthenticatedView, NotAuthenticatedView
from django.http.response import JsonResponse
from rest_framework import status
from perfil.models import *
from perfil.serializers import *

class PerfilApi(AuthenticatedView):

    def post(self, request):
        data = JSONParser().parse(request)
        perfil_serializer = PerfilSerializer(data=data)
        if perfil_serializer.is_valid():
            tags = []
            try:
                identificacao_individual = Tags.objects.get(categoria=Categoria.objects.get(descricao='identificacao_individual'), tag=perfil_serializer.validated_data['identificacao_individual'][0])
                tags.append(identificacao_individual)
            except:
                pass
        
            try:
                competencias = Tags.objects.get(categoria=Categoria.objects.get(descricao='competencias'), tag=perfil_serializer.validated_data['competencias'][0])
                tags.append(competencias)
            except:
                pass
            
            try:
                se_ve_trabalhando = Tags.objects.get(categoria=Categoria.objects.get(descricao='se_ve_trabalhando'), tag=perfil_serializer.validated_data['se_ve_trabalhando'][0])
                tags.append(se_ve_trabalhando)
            except:
                pass

            try:
                visao_de_mundo = Tags.objects.get(categoria=Categoria.objects.get(descricao='visao_de_mundo'), tag=perfil_serializer.validated_data['visao_de_mundo'][0])
                tags.append(visao_de_mundo)
            except:
                pass
            
            # Perfil
            perfil_tags = PerfilTag.objects.filter(
                tag__in=tags
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
            habilidade = {
                'labels' : [hab.descricao for hab in habilidades],   
                'datasets' : [{
                    'data' : [hab.valor for hab in habilidades]
                }]
            }
            #habilidade_serializer = HabilidadeSerializer(habilidades, read_only=True, many=True)

            data={
                'texto_personalidade' : personalidade.texto_personalidade,
                'texto_empreendedor' : personalidade.perfil_empreendedor,
                'habilidades': habilidade,
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
                cases_data = []
                for case in cases:
                    case_obj = {
                        'titulo' : case.case.titulo,
                        'link' : case.case.link,
                        'personalidade' : case.case.personalidade
                    }
                    cases_data.append(case_obj)
                #case_serializer = CaseSerializer([case_perfil.case for case_perfil in cases], read_only=True, many=True)
                
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
                    'cases' : cases_data,
                    'oportunidade_vagas' : VagaSerializer(vagas, read_only=True, many=True).data if len(vagas) > 0 else [],
                    'oportunidade_materias' : MateriaSerializer(materias, read_only=True, many=True).data if len(materias) > 0 else []
                }
                data['perfils'].append(data_perfil)
      


            return JsonResponse(data=data, status=status.HTTP_200_OK)
        return JsonResponse(data={'message': 'Erro no envio dos dados' + str(perfil_serializer.errors)}, status=status.HTTP_400_BAD_REQUEST)
        
