from models import Vertex
from models import Edge

'''
    Classe que representa o grafo do mapa da EACH.
    O grafo é contruído em tempo de execução quando instanciado.
    
    Atributos:
        - vertices: conjunto de vértices do grafo
        - edges: conjunto de arestas do grafo
    
    Métodos:
        - build(): constroi o grafo com base nos dados da tabela de vértices e arestas
        - most_acessible_route(): implementa o algoritmo de Dijkstra para encontrar a rota mais acessível
'''
class Graph:
    
    def __init__(self):
        self._vertices = set(Vertex.objects.all())
        self._edges = set(Edge.objects.all())
        self._build()
    
    def _build(self):
        for vertex in self._vertices:
            vertex.find_edges(self._edges)
    
    # Implementa Dijkstra
    def most_acessible_route(self, origin: Vertex, destiny: Edge):
        pass