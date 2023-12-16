from django.db import models
from .vertex import Vertex

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
    height = models.FloatField()
    slope = models.FloatField()
    surface_type = models.IntegerField()
    surface_quality = models.IntegerField()
    segment_type = models.IntegerField()
    isCovered = models.BooleanField(default=False, null=True)
    isCrowded = models.BooleanField(default=False, null=True)
    
    def __repr__(self) -> str:
        return self.name
    
    @property
    def weight(self):
        weight = (self.length
        + (1.2/self.width if self.width != 0 else 0)
        + (self.height*self.length)
        + (self.slope*self.length)
        + (self.surface_type*self.length)
        + (self.surface_quality*self.length)
        + (self.segment_type*self.length))
        return weight
    
    @property
    def weight_crowded(self):
        weight = 10*self.length if self.isCrowded else 0
        return weight
    
    @property
    def weight_covered(self):
        weight = 10*self.length if not self.isCovered else 0
        return weight
    
    def search_vertex_id(self, vertex_id: str) -> str | None:
        if self.origin.id == vertex_id:     # se está como origem, recebe o destino
            return self.destiny.id
        if self.destiny.id == vertex_id:    # se está como destino, recebe a origem
            return self.origin.id
        return None