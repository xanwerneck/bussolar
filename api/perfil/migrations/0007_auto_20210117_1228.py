# Generated by Django 2.2.17 on 2021-01-17 12:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('perfil', '0006_auto_20210117_1228'),
    ]

    operations = [
        migrations.AlterField(
            model_name='habilidade',
            name='personalidade',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='perfil.Personalidade'),
        ),
    ]
