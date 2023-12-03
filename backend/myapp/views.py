from django.shortcuts import render
from rest_framework import generics
from .models.vertex import Vertex
from .models.edge import Edge
from .serializers import VertexSerializer, EdgeSerializer, GraphResponseSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .graph.graph import Graph

class VertexList(generics.ListCreateAPIView):

    queryset = Vertex.objects.all()
    serializer_class = VertexSerializer

class EdgeList(generics.ListCreateAPIView):

    queryset = Edge.objects.all()
    serializer_class = EdgeSerializer


@api_view(['GET'])
def most_acessible_route(request):
    try:
        origin = request.GET.get('origin')
        destiny = request.GET.get('destiny')
        preferences = _check_preferences(request)
        graph = Graph(preferences)
        response = graph.most_acessible_route(origin, destiny)
        if response:
            response = GraphResponseSerializer(response)
            return JsonResponse(response.data, safe=False)
        return JsonResponse({'error': f'vertices {origin} or {destiny} do not exist'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def _check_preferences(request):
    preferences = {'raining': False, 'crowded': False}
    if request.GET.get('raining'):
        preferences['raining']= True if request.GET.get('raining').lower() == 'true' else False
    if request.GET.get('crowded'):
        preferences['crowded'] = True if request.GET.get('crowded').lower() == 'true' else False
    return preferences