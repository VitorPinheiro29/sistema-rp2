from django.db import models
from edge import Edge

''''
    Classe que representa os vértices do grafo.
    Atributos:
        - name: nome que identifica o vértice
        - latitude: coordenada geográfica
        - longitude: coordenada geográfica
        - edges: conjuto de arestas incidentes do vértice. Representa uma lista de incidências.
'''
class Vertex(models.Model):
    
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=7)
    longitude = models.DecimalField(max_digits=9, decimal_places=7)
    edges = set()
    
    def find_edges(self, edges: Edge):
        for edge in edges:
            if edge.origin == self.id or edge.destiny == self.id:
                self.edges.add(edge)