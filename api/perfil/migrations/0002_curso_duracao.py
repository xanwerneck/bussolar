# Generated by Django 2.2.17 on 2021-01-17 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('perfil', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='curso',
            name='duracao',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]