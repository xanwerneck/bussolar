# Generated by Django 2.2.17 on 2021-01-17 12:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('perfil', '0007_auto_20210117_1228'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='habilidade',
            name='personalidade',
        ),
    ]
