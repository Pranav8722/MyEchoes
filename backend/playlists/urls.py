from django.urls import path
from .views import PlaylistListCreateView, MediaFileUploadView

urlpatterns = [
    path('', PlaylistListCreateView.as_view(), name='playlist-list-create'),
    path('upload/', MediaFileUploadView.as_view(), name='mediafile-upload'),
]
