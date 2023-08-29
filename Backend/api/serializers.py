from rest_framework import serializers
from . import models


class TaskSerializer(serializers.ModelSerializer):
    created_on      = serializers.DateTimeField(format="%d-%m-%Y at %H:%M:%S")
    last_modified   = serializers.DateTimeField(format="%d-%m-%Y at %H:%M:%S")
    class Meta:
        model = models.Task
        fields = '__all__'
        
    def save(self, **kwargs):
        return super().save(**kwargs)
    
class TaskCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Task
        fields = ('id', 'title', 'description')
        
    def save(self, **kwargs):
        return super().save(**kwargs)