from heapq import heappush, heappop, heapify
from models import Vertex


'''
    Fila de prioridades utilizada no algoritmo de Dijkstra.
    Cada item da fila é um vértice e a prioridade o campo weight_estimate do vértice.
'''
class PriorityQueue:
    
    def __init__(self, vertices: set) -> None:
        self._queue = []
        self._items = {}
        self._initialize(vertices)
    
    def _initialize(self, vertices: set):
        for vertex in vertices:
            self.push(vertex, vertex.weight_estimate)
        
    def push(self, vertex: Vertex, priority: float) -> None:
        _tuple = (priority, vertex)
        self._items[vertex] = _tuple
        heappush(self._queue, _tuple)
        
    def update(self, vertex: Vertex, new_priority: float):
        _tuple = self._items[vertex]
        self._queue.remove(_tuple)
        self.push(vertex, new_priority)
    
    def pop(self) -> Vertex:
        if self._queue:
            return heappop(self._queue)[1]
        else:
            return None
        
    def is_empty(self) -> bool:
        if self._queue:
            return False
        return True