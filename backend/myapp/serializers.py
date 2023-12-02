from rest_framework import serializers
from .models.vertex import Vertex
from .models.edge import Edge
from .graph.graphResponse import GraphResponse

class VertexSerializer(serializers.ModelSerializer):

    class Meta:

        model = Vertex
        fields = ('id', 'name', 'latitude', 'longitude', 'vertexType', 'isAcessible', 'observation')
        
class EdgeSerializer(serializers.ModelSerializer):

    class Meta:

        model = Edge
        fields = '__all__'

class GraphResponseSerializer(serializers.Serializer):
    origin = VertexSerializer()
    destiny = VertexSerializer()
    waypoints = VertexSerializer(many=True)