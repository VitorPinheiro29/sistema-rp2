from graph import Graph
from models import Vertex
from priority_queue import PriorityQueue

class GraphAlgorithms:
    
    @staticmethod
    def dijkstra(graph: Graph, source: Vertex):
        source.weight_estimate = 0
        queue = PriorityQueue(graph.vertices)
        while not queue.is_empty():
            vertex = queue.pop()
            for tuple in vertex.adjacencies:
                GraphAlgorithms._relax(vertex, tuple[0], tuple[1].weight, queue)
    
    @staticmethod
    def _relax(vertex: Vertex, adjacent: Vertex, weight: float, queue: PriorityQueue):
        if adjacent.weight_estimate > vertex.weight_estimate + weight:
            adjacent.weight_estimate = vertex.weight_estimate + weight
            adjacent.predecessor = vertex
            queue.update(adjacent, adjacent.weight_estimate)