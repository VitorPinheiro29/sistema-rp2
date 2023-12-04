class Adjacency:
    
    def __init__(self, vertex, edge):
        self._vertex = vertex
        self._edge = edge
    
    @property
    def vertex(self):
        return self._vertex
    
    @property
    def edge(self):
        return self._edge.weight
    
    @property
    def weight_covered(self):
        return self._edge.weight_covered
    
    @property
    def weight_crowded(self):
        return self._edge.weight_crowded