from django.db import models
from models import Vertex, Edge

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
    
    def __init__(self, *args, **kwargs):
        super(Vertex, self).__init__(*args, **kwargs)
        self.weight_estimate = 1_000_000
        self.predecessor = None
        self.adjacencies = set()
    
    def find_vertices_adjacent(self, edges: set):
        for edge in edges:
            if edge.origin == self:
                self.adjacencies.add((edge.destiny, edge))
            if edge.destiny == self:
                self.adjacencies.add((edge.origin, edge))
                
                
'''
    Classe que modela as arestas do grafo.
    Atributos:
        - name: nome que identifica a aresta
        - origin: vértice origem em que a aresta incide
        - destination: vértice destino em que a aresta incide
        - length: comprimento em metros da aresta
        - width: largura em metros/cm da aresta
        - height: altura da superfície em relação a algum piso em torno dele
        - slope: inclinação da superfície
        - surface_type: qualidade da superfície
        - surface_quality: qualidade da superfície
        - segment_type: tipo de material que compõe a superfície
    
    Métodos:
        - weight: retorna o peso a ser considerado da aresta
'''
class Edge(models.Model):
    
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    origin = models.ForeignKey(Vertex, on_delete=models.CASCADE, related_name='edges_origin')
    destiny = models.ForeignKey(Vertex, on_delete=models.CASCADE, related_name='edges_destiny')
    length = models.FloatField()
    width = models.FloatField()
    height = models.IntegerField()
    slope = models.FloatField()
    surface_type = models.IntegerField()
    surface_quality = models.IntegerField()
    segment_type = models.IntegerField()

    @property
    def weight(self):
        weight = self.length
        + self.width
        + self.height
        + self.slope
        + self.surface_type
        + self.surface_quality
        + self.segment_type
        return weight