from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Playlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='playlists')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"


class MediaFile(models.Model):
    PLAYLIST_MEDIA_TYPES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]

    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name='media_files')
    file = models.FileField(upload_to='media/')
    file_type = models.CharField(max_length=5, choices=PLAYLIST_MEDIA_TYPES)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file.name} in {self.playlist.name}"
