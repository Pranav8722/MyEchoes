from rest_framework import generics, permissions
from .models import Playlist
from .serializers import PlaylistSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

class PlaylistListCreateView(generics.ListCreateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated]

class MediaFileUploadView(generics.CreateAPIView):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
