from rest_framework import serializers
from .models import *
from apps.category.serializers import CategorySerializer


class RoomSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

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
            'Views',
            'category'
        ]


class RoomListSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Room
        fields = [
            'RoomID',
            'RoomName',
            'Slug',
            'Thumbnail',
            'Description',
            'RoomPrice',
            'RoomNumber',
            'Status',
            'Views',
            'category'
        ]
