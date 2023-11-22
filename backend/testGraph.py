import os
import django

# Carregando o Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myapi.settings')
django.setup()

from myapp.models import Vertex, Edge
from myapp.graph.graph import Graph
from myapp.graph.graphResponse import GraphResponse
from myapp.graph.priority_queue import PriorityQueue

# Testando recuperação dos registros
def load_data(print_data=False) -> dict:
    data = {}
    data['vertices'] = list(Vertex.objects.all())
    data['edges'] = list(Edge.objects.all())
    
    if print_data:
        for key, value in data.items():
            print(f"{key} = {value}")
    return data

# Carregando o Grafo
def create_graph(print_data=True) -> Graph:
    graph = Graph()
    if print_data:
        print("Loaded graph:")
        for v in graph.vertices:
            print(v)
            for adj in v.adjacencies:
                print(f"\t{adj}")
    return graph

# Testando pesquisa de vértices
def vertices_search(graph: Graph, print_data=True):
    tests = [("VX", "VZ"), ("VZ", "VZ"), ("VZ", "AA"), ("AA", "VZ"), ("BB", "ZZ")]
    if print_data:
        for test in tests:
            result = graph._vertices_search(test[0], test[1])
            print(result)

def most_acessible_route(graph: Graph):
    result = graph.most_acessible_route("VS", "VX")
    print(result)


def test_queue(vertices: set):
    queue = PriorityQueue(vertices)
    vertices[0].weight_estimate = 0
    print("Vertices: ", vertices)
    print("Queue: ", queue)
    vertices[1].weight_estimate = 10
    v = queue.pop()
    print(v)
    print(queue)

if __name__ == "__main__":
    graph = create_graph(False)
    most_acessible_route(graph)


'''
origin: VS(0)
destiny: VX(8.0)
waypoints: {VT(7.0), VY(5.0)}
''' 