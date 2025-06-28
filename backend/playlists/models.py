from django.db import models

class Playlist(models.Model):
    title = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='uploads/')

    def __str__(self):
        return self.title
