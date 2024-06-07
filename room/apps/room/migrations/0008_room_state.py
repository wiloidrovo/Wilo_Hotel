# Generated by Django 5.0.6 on 2024-06-02 05:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0007_alter_room_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='state',
            field=models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='draft', max_length=10),
        ),
    ]