from ..models.vertex import Vertex

'''
    Classe que modela a resposta da rota mais acessível entre um vértice origem e destino.
    Atributos:
        - _origin: vértice origem
        - _destiny: vértice destino
        - _waypoints: os vértices a serem percorridos a partir do vértice origem para atingir o vértice destino
'''
class GraphResponse:
    
    def __init__(self, origin: Vertex, destiny: Vertex):
        self._origin = origin
        self._destiny = destiny
        self._waypoints = set()
        
    @property
    def origin(self):
        return self._origin
    
    @property
    def destiny(self):
        return self._destiny
    
    @property
    def waypoints(self):
        return self._waypoints
    
    def add_waypoints(self, waypoint: Vertex):
        self._waypoints.add(waypoint)
    
    def __repr__(self) -> str:
        string = f"origin: {self._origin}\ndestiny: {self._destiny}\nwaypoints: {self._waypoints}"
        return string
    
    def to_dict(self):
        return {
            'origin': self._origin,
            'destiny': self._destiny,
            'waypoints': self._waypoints
        }