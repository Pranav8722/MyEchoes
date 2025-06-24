from django.urls import path
from .views import PlaylistListCreateView, MediaFileUploadView

urlpatterns = [
    path('playlists/', PlaylistListCreateView.as_view(), name='playlist_list_create'),
    path('media/upload/', MediaFileUploadView.as_view(), name='media_upload'),
]