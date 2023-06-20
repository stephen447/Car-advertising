# Generated by Django 4.2.2 on 2023-06-20 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_advert_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='advert',
            old_name='image',
            new_name='image1',
        ),
        migrations.AddField(
            model_name='advert',
            name='image2',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AddField(
            model_name='advert',
            name='image3',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AddField(
            model_name='advert',
            name='image4',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AddField(
            model_name='advert',
            name='image5',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]