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
    origin = request.GET.get('origin')
    destiny = request.GET.get('destiny')
    isRaining = request.GET.get('isRaining')
    isCrowded = request.GET.get('isCrowded')
    graph = Graph()
    response = graph.most_acessible_route(origin, destiny)
    if response:
        response = GraphResponseSerializer(response)
        return JsonResponse(response.data, safe=False)
    return JsonResponse({'error': f'vertices {origin} or {destiny} do not exist'}, status=404)