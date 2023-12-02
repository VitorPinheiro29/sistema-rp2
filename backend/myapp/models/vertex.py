from django.db import models
from .adjacency import Adjacency

''''
    Classe que modela os vértices do grafo.
    Atributos:
        - name: nome que identifica o vértice
        - latitude: coordenada geográfica
        - longitude: coordenada geográfica
        - weight_estimate: estimativa de peso inicial do vértice, usando para relaxamento
        - predecessor: vértice predecessor do atual
        - adjacencies: conjunto de tuplas que contém (vértice adjacente, aresta)
'''
class Vertex(models.Model):
    
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=7)
    longitude = models.DecimalField(max_digits=9, decimal_places=7)
    vertexType = models.CharField(max_length=9,null=True)
    isAcessible = models.BooleanField(default=False, null=True)
    observation = models.CharField(max_length=255, default="", null=True)
    
    def __init__(self, *args, **kwargs):
        super(Vertex, self).__init__(*args, **kwargs)
        self.weight_estimate = 1_000_000
        self.predecessor = None
        self.adjacencies = []
    
    def __repr__(self) -> str:
        return str(f'{self.id}({self.weight_estimate})')
    
    def __str__(self) -> str:
        return str(f'{self.id}({self.weight_estimate})')
    
    def __lt__(self, other):
        return self.weight_estimate < other.weight_estimate

    def add_adjacent(self, vertex, edge):
        adjacent = Adjacency(vertex, edge)
        self.adjacencies.append(adjacent)