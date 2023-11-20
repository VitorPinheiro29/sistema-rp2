from models import Vertex

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
    
    def add_waypoints(self, waypoint: Vertex):
        self._waypoints.add(waypoint)