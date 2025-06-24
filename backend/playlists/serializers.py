from rest_framework import serializers
from .models import Playlist, MediaFile

class MediaFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaFile
        fields = '__all__'
        read_only_fields = ['uploaded_at']


class PlaylistSerializer(serializers.ModelSerializer):
    media_files = MediaFileSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'created_at', 'media_files']
        read_only_fields = ['created_at']
