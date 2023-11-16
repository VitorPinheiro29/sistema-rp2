from django.db import models
from vertex import Vertex

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
    origin = models.ForeignKey(Vertex, on_delete=models.CASCADE)
    destiny = models.ForeignKey(Vertex, on_delete=models.CASCADE)
    length = models.FloatField()
    width = models.FloatField()
    height = models.IntegerField()
    slope = models.FloatField()
    surface_type = models.IntegerField()
    surface_quality = models.IntegerField()
    segment_type = models.IntegerField()
    weigth = models.FloatField()