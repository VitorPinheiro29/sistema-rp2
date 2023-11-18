from django.db import models


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
    
    def find_edges(self, edges):
        for edge in edges:
            if edge.origin.id == self.id or edge.destiny.id == self.id:
                self.edges.add(edge)
                
'''
    Classe que representa as arestas do grafo.
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
'''
class Edge(models.Model):
    
    name = models.CharField(max_length=255, primary_key=True)
    origin = models.ForeignKey(Vertex, on_delete=models.CASCADE, related_name='edges_origin')
    destiny = models.ForeignKey(Vertex, on_delete=models.CASCADE, related_name='edges_destiny')
    length = models.FloatField()
    width = models.FloatField()
    height = models.IntegerField()
    slope = models.FloatField()
    surface_type = models.IntegerField()
    surface_quality = models.IntegerField()
    segment_type = models.IntegerField()
    weigth = models.FloatField()

