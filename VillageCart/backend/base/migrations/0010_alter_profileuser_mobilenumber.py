# Generated by Django 5.1.1 on 2024-09-17 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_profileuser'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profileuser',
            name='mobileNumber',
            field=models.CharField(max_length=12),
        ),
    ]
