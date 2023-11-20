from models import Vertex, Edge
from graphAlgorithms import GraphAlgorithms
from graph import GraphResponse

'''
    Classe que modela o grafo do mapa da EACH.
    O grafo é contruído em tempo de execução quando instanciado.
    
    Atributos:
        - vertices: conjunto de vértices do grafo
        - edges: conjunto de arestas do grafo
    
    Métodos:
        - build(): constroi o grafo com base nos dados da tabela de vértices e arestas
        - most_acessible_route_single_source(): implementa o algoritmo de Dijkstra para encontrar a rota mais acessível
'''
class Graph:
    
    def __init__(self):
        self._vertices = set(Vertex.objects.all())
        self._edges = set(Edge.objects.all())
        self._build()
        
    @property
    def vertices(self) -> set:
        return self._vertices
    
    def _build(self):
        for vertex in self._vertices:
            vertex.find_vertices_adjacent(self._edges)
    
    # Implementa Dijkstra
    def most_acessible_route(self, origin: Vertex, destiny: Edge) -> GraphResponse:
        GraphAlgorithms.dijkstra(self, origin)
        return self._extract_path(origin, destiny)
    
    
    # Constroi o caminho do vértice origem até o destino
    def _extract_path(self, origin: Vertex, destiny: Vertex) -> GraphResponse:
        graphResponse = GraphResponse(origin, destiny)
        predecessor = destiny.predecessor
        while True:
            if (predecessor == origin):
                break
            graphResponse.add_waypoints(predecessor)
            predecessor = predecessor.predecessor
        return graphResponse