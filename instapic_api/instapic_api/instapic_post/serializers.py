from django.contrib.auth.models import Group, User
from rest_framework.serializers import (
    ModelSerializer,
    StringRelatedField,
)

from instapic_api.instapic_post.models import (Comment, Post, Tag)


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class RegisterUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['created', 'owner', 'text']


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name']


class PostSerializer(ModelSerializer):
    owner = StringRelatedField(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'description',
            'created',
            'owner',
            'picture',
            'tags',
        ]
