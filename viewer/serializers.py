from rest_framework import serializers
from . models import ThreeDCase
class glbSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreeDCase
        fields = ('user', 'id', 'upper_model', 'lower_model')