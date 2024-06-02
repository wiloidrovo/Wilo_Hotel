from django.db import models
from ckeditor.fields import RichTextField
from apps.category.models import Category


def room_thumbnail_directory(instance, filename):
    return 'room/{0}/{1}'.format(instance.RoomName, filename)


# Create your models here.
class Room(models.Model):

    class RoomObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(state='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    RoomID = models.CharField(max_length=6, primary_key=True)
    RoomName = models.CharField(max_length=255)
    Slug = models.SlugField(max_length=255, unique=True)
    Thumbnail = models.ImageField(
        upload_to=room_thumbnail_directory, max_length=500)
    Description = models.TextField(max_length=255)
    Content = RichTextField()
    RoomPrice = models.DecimalField(max_digits=4, decimal_places=2)
    RoomNumber = models.IntegerField()
    Status = models.CharField(max_length=30)
    Views = models.IntegerField(default=0, blank=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    state = models.CharField(max_length=10, choices=options, default='draft')
    objects = models.Manager()  # default manager
    roomobjects = RoomObjects()  # custom manager

    class Meta:
        ordering = ('-RoomName',)

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
