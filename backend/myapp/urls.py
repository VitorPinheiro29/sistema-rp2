from django.urls import path
from .views import VertexList, EdgeList

urlpatterns = [
    path('vertices/', VertexList.as_view(), name='vertices-list'),
    path('edges/', EdgeList.as_view(), name='edges-list')
]