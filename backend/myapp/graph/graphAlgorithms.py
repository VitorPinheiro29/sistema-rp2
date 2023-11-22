from ..models import Vertex
from .priority_queue import PriorityQueue

class GraphAlgorithms:
    
    @staticmethod
    def dijkstra(graph, source: Vertex):
        source.weight_estimate = 0
        queue = PriorityQueue(graph.vertices)
        while not queue.is_empty():
            vertex = queue.pop()
            for adjacent in vertex.adjacencies:
                GraphAlgorithms._relax(vertex, adjacent.vertex, adjacent.edge)
    
    @staticmethod
    def _relax(vertex: Vertex, adjacent: Vertex, weight: float):
        if adjacent.weight_estimate > vertex.weight_estimate + weight:
            adjacent.weight_estimate = vertex.weight_estimate + weight
            adjacent.predecessor = vertex