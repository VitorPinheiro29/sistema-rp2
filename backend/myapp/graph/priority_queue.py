from heapq import heappush, heappop, heapify
from ..models.vertex import Vertex


'''
    Fila de prioridades utilizada no algoritmo de Dijkstra.
    Cada item da fila é um vértice e a prioridade o campo weight_estimate do vértice.
'''
class PriorityQueue:
    def __init__(self, vertices: list) -> None:
        self._queue = list(vertices)
        
    def push(self, vertex) -> None:
        heappush(self._queue, vertex)

    def pop(self):
        heapify(self._queue)
        if self._queue:
            return heappop(self._queue)
        else:
            return None

    def is_empty(self) -> bool:
        return not bool(self._queue)
    
    def __repr__(self) -> str:
        return str(self._queue)