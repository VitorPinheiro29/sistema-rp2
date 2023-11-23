from django.shortcuts import render
from rest_framework import generics
from .models.vertex import Vertex
from .models.edge import Edge
from .serializers import VertexSerializer, EdgeSerializer

class VertexList(generics.ListCreateAPIView):

    queryset = Vertex.objects.all()
    serializer_class = VertexSerializer

class EdgeList(generics.ListCreateAPIView):

    queryset = Edge.objects.all()
    serializer_class = EdgeSerializer