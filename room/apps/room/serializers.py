from rest_framework import serializers
from .models import *


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = [
            'RoomID',
            'RoomName',
            'Slug',
            'Thumbnail',
            'Description',
            'Content',
            'RoomPrice',
            'RoomNumber',
            'Status',
            'Views'
            'category'
        ]
