# Generated by Django 4.2.7 on 2023-12-02 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_alter_vertex_vertextype'),
    ]

    operations = [
        migrations.AddField(
            model_name='edge',
            name='isCrowded',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
