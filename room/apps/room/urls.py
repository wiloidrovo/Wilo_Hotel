from django.urls import path
from .views import *

urlpatterns = [
    path('list', RoomListView.as_view()),
    path('by_category', ListRoomsByCategoryView.as_view()),
    path('detail/<slug>', RoomDetailView.as_view()),
    path('search', SearchRoomView.as_view()),
]
