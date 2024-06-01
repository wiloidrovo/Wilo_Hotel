from django.db import models
from apps.category.models import Category
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField


def room_thumbnail_directory(instance, filename):
    return 'room/{0}/{1}'.format(instance.name, filename)


# Create your models here.
class Room(models.Model):
    RoomID = models.CharField(max_length=6, primary_key=True)
    RoomName = models.CharField(max_length=255)
    Slug = models.SlugField(max_length=255, unique=True)
    Thumbnail = models.ImageField(upload_to=room_thumbnail_directory)
    Description = models.TextField(max_length=255)
    Content = RichTextUploadingField()
    RoomPrice = models.DecimalField(max_digits=4, decimal_places=2)
    RoomNumber = models.IntegerField()
    Status = models.CharField(max_length=30)
    Views = models.IntegerField(default=0, blank=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)

    def __str__(self):
        return self.RoomName

    def get_view_count(self):
        Views = ViewCount.objects.filter(room=self).count()
        return Views


class ViewCount(models.Model):
    room = models.ForeignKey(
        Room, related_name='room_view_count', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.ip_address}"
