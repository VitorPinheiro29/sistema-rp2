from ..models.vertex import Vertex
from ..models.edge import Edge
from .graphAlgorithms import GraphAlgorithms
from .graphResponse import GraphResponse

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
    
    def __init__(self, preferences):
        self._vertices = list(Vertex.objects.all())
        self._edges = list(Edge.objects.all())
        self._preferences = preferences
        self._build()
        
    @property
    def vertices(self) -> set:
        return self._vertices
    
    @property
    def edges(self) -> set:
        return self._edges
            
    def _build(self):
        for vertex in self._vertices:
            for edge in self.edges:
                adjacent_id = edge.search_vertex_id(vertex.id)
                if adjacent_id:
                    adjacent = self._search_vertex_references(adjacent_id)
                    if adjacent:
                        vertex.add_adjacent(adjacent, edge)
    
    def _search_vertex_references(self, vertex_id: str) -> Vertex | None:
        for vertex in self._vertices:
            if vertex.id == vertex_id:
                return vertex
        return None
    
    # Implementa Dijkstra
    def most_acessible_route(self, origin_id: str, destiny_id: str) -> GraphResponse | None:
        origin = self._search_vertex_references(origin_id)
        destiny = self._search_vertex_references(destiny_id)
        if origin is None or destiny is None:
            return None
        GraphAlgorithms.dijkstra(self, origin, self._preferences)
        return self._extract_path(origin, destiny)
    
    # Constroi o caminho do vértice origem até o destino
    def _extract_path(self, origin: Vertex, destiny: Vertex) -> GraphResponse:
        graphResponse = GraphResponse(origin, destiny)
        predecessor = destiny.predecessor
        while predecessor.predecessor is not None:
            graphResponse.add_waypoints(predecessor)
            predecessor = predecessor.predecessor
        return graphResponse