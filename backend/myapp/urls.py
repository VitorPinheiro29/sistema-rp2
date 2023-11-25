from django.urls import path
from .views import VertexList, EdgeList, most_acessible_route

urlpatterns = [
    path('vertices/', VertexList.as_view(), name='vertices-list'),
    path('edges/', EdgeList.as_view(), name='edges-list'),
    path('acessible-route/', most_acessible_route, name='acessible-route')
]