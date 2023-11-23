from rest_framework import serializers
from .models.vertex import Vertex
from .models.edge import Edge

class VertexSerializer(serializers.ModelSerializer):

    class Meta:

        model = Vertex
        fields = ('id', 'name', 'latitude', 'longitude')
        
class EdgeSerializer(serializers.ModelSerializer):

    class Meta:

        model = Edge
        fields = '__all__'