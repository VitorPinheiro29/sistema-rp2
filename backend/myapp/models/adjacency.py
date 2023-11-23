class Adjacency:
    
    def __init__(self, vertex, edge):
        self._vertex = vertex
        self._edge = edge.weight
    
    @property
    def vertex(self):
        return self._vertex
    
    @property
    def edge(self):
        return self._edge