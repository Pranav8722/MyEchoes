import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Dashboard = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [musicFileUrl, setMusicFileUrl] = useState('');
    const [playlistImages, setPlaylistImages] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get('playlists/', { headers: { Authorization: `Bearer ${localStorage.getItem('access')}` } })
            .then(response => setPlaylists(response.data))
            .catch(error => console.error(error));
    }, []);

    const handlePlaylistSelect = (playlist) => {
        setSelectedPlaylist(playlist);
        setMusicFileUrl(playlist.music_file);
        setPlaylistImages(playlist.images);
    };

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = () => {
        if (!file || !selectedPlaylist) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('playlist_id', selectedPlaylist.id);

        axios.post('playlists/upload/', formData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('access')}` }
        })
            .then(response => {
                alert('File uploaded successfully!');
                setPlaylistImages([...playlistImages, response.data.file_url]);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="p-4 space-y-6">
            <h1 className="text-3xl font-bold text-center mb-4">Welcome to MyEchoes 🎧</h1>

            {/* Playlist Selection */}
            <div className="flex space-x-4 overflow-x-auto">
                {playlists.map((playlist) => (
                    <button
                        key={playlist.id}
                        className={`p-2 rounded-xl border ${selectedPlaylist?.id === playlist.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handlePlaylistSelect(playlist)}
                    >
                        {playlist.name}
                    </button>
                ))}
            </div>

            {/* Music Player */}
            {musicFileUrl && (
                <div className="flex flex-col items-center">
                    <audio
                        controls
                        src={musicFileUrl}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        className="mb-4 w-full"
                    />
                </div>
            )}

            {/* Slideshow */}
            {isPlaying && playlistImages.length > 0 && (
                <Slide easing="ease" duration={3000} indicators={true}>
                    {playlistImages.map((image, index) => (
                        <div key={index} className="each-slide flex justify-center items-center h-64 bg-black">
                            <img src={image} alt={`Slide ${index}`} className="h-full object-contain rounded-xl" />
                        </div>
                    ))}
                </Slide>
            )}

            {/* File Upload */}
            {selectedPlaylist && (
                <div className="mt-6 flex flex-col items-center">
                    <input type="file" onChange={handleFileChange} className="mb-2" />
                    <button onClick={handleUpload} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                        Upload to {selectedPlaylist.name}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
