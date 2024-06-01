from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Room, ViewCount
from apps.category.models import Category
from .serializers import RoomSerializer


class RoomListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Room.objects.all().exists():
            print('list rooms')
            return Response({'Rooms': 'test message'}, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'No rooms found'}, status=status.HTTP_404_NOT_FOUND)
