# Generated by Django 5.0.6 on 2024-05-30 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Audio',
            fields=[
                ('id_audio', models.AutoField(primary_key=True, serialize=False)),
                ('youtube_id', models.CharField(max_length=255)),
            ],
        ),
    ]
