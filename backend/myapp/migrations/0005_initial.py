# Generated by Django 4.2.7 on 2023-11-23 00:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('myapp', '0004_delete_edge_delete_vertex'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vertex',
            fields=[
                ('id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('latitude', models.DecimalField(decimal_places=7, max_digits=9)),
                ('longitude', models.DecimalField(decimal_places=7, max_digits=9)),
            ],
        ),
        migrations.CreateModel(
            name='Edge',
            fields=[
                ('id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('length', models.FloatField()),
                ('width', models.FloatField()),
                ('height', models.IntegerField()),
                ('slope', models.FloatField()),
                ('surface_type', models.IntegerField()),
                ('surface_quality', models.IntegerField()),
                ('segment_type', models.IntegerField()),
                ('destiny', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edges_destiny', to='myapp.vertex')),
                ('origin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='edges_origin', to='myapp.vertex')),
            ],
        ),
    ]
