from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Post(models.Model):
    description = models.CharField(max_length=256)
    created = models.DateTimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    picture = models.FileField()

    def __str__(self):
        return self.description


class Comment(models.Model):
    created = models.DateTimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.CharField(max_length=512)

    def __str__(self):
        return self.text
