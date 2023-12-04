from ..models.vertex import Vertex
from .priority_queue import PriorityQueue

class GraphAlgorithms:
    
    @staticmethod
    def dijkstra(graph, source, preferences):
        source.weight_estimate = 0
        queue = PriorityQueue(graph.vertices)
        while not queue.is_empty():
            vertex = queue.pop()
            for adjacent in vertex.adjacencies:
                GraphAlgorithms._relax(vertex, adjacent.vertex, GraphAlgorithms._weights(adjacent, preferences))
    
    @staticmethod
    def _relax(vertex: Vertex, adjacent: Vertex, weight: float):
        if adjacent.weight_estimate > vertex.weight_estimate + weight:
            adjacent.weight_estimate = vertex.weight_estimate + weight
            adjacent.predecessor = vertex
    
    @staticmethod
    def _weights(adjacent, preferences) -> float:
        if preferences['raining'] and preferences['crowded']:
            return (adjacent.edge + adjacent.weight_covered + adjacent.weight_crowded)
        elif preferences['raining']:
            return (adjacent.edge + adjacent.weight_covered)
        elif preferences['crowded']:
            return (adjacent.edge + adjacent.weight_crowded)
        else:
            return adjacent.edge