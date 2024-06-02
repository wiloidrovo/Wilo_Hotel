from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Room, ViewCount
from apps.category.models import Category
from .serializers import RoomSerializer, RoomListSerializer
from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination
from django.db.models.query_utils import Q


class RoomListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Room.roomobjects.all().exists():

            rooms = Room.roomobjects.all()

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(rooms, request)
            serializer = RoomListSerializer(results, many=True)

            return paginator.get_paginated_response({'Rooms': serializer.data})
        else:
            return Response({'Error': 'No rooms found'}, status=status.HTTP_404_NOT_FOUND)


class ListRoomsByCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Room.roomobjects.all().exists():

            slug = request.query_params.get('slug')
            category = Category.objects.get(slug=slug)

            rooms = Room.roomobjects.order_by('RoomName').all()

        # Si la categoría tiene un padre, filtrar solo por esta categoría y no por el padre también
        # if category.parent:
        #    rooms = rooms.filter(category=category)

        # Si la categoría no tiene una categoría padre, significa que ella misma es una categoría padre
        # else:

            # Filtrar categoría sola
            if not Category.objects.filter(parent=category).exists():
                rooms = rooms.filter(category=category)
            # Si esta categoría padre tiene hijos, filtrar por la categoría padre y sus hijos
            else:
                sub_categories = Category.objects.filter(parent=category)

                filtered_categories = [category]

                for cat in sub_categories:
                    filtered_categories.append(cat)

                filtered_categories = tuple(filtered_categories)

                rooms = rooms.filter(category__in=filtered_categories)

            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(rooms, request)
            serializer = RoomListSerializer(results, many=True)

            return paginator.get_paginated_response({'Rooms': serializer.data})
        else:
            return Response({'Error': 'No rooms found'}, status=status.HTTP_404_NOT_FOUND)


class RoomDetailView(APIView):
    def get(self, request, slug, format=None):
        if Room.roomobjects.filter(Slug=slug).exists():
            room = Room.roomobjects.get(Slug=slug)
            serializer = RoomSerializer(room)

            address = request.META.get('HTTP_X_FORWARDED_FOR')
            if address:
                ip = address.split(',')[-1].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')

            if not ViewCount.objects.filter(room=room, ip_address=ip):
                view = ViewCount(room=room, ip_address=ip)
                view.save()
                room.Views += 1
                room.save()

            return Response({'Room': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'Error': 'Room does not exist'}, status=status.HTTP_404_NOT_FOUND)


class SearchRoomView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        search_term = request.query_params.get('s')
        matches = Room.roomobjects.filter(
            Q(RoomName__icontains=search_term) |
            Q(Description__icontains=search_term) |
            Q(category__name__icontains=search_term)
        )
        serializer = RoomListSerializer(matches, many=True)
        return Response({'filtered_rooms': serializer.data}, status=status.HTTP_200_OK)
