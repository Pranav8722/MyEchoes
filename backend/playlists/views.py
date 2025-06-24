from rest_framework import generics, permissions
from .models import Playlist, MediaFile
from .serializers import PlaylistSerializer, MediaFileSerializer

# Playlist Creation and Listing
class PlaylistListCreateView(generics.ListCreateAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Playlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Upload Media Files to Playlist
class MediaFileUploadView(generics.CreateAPIView):
    serializer_class = MediaFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        playlist = Playlist.objects.get(id=self.request.data.get('playlist'))
        if playlist.user != self.request.user:
            raise PermissionError("You don't have access to this playlist.")
        serializer.save()
