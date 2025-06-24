import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Dashboard = () => {
    const [playlists, setPlaylists] = useState([]);
    const [playlistName, setPlaylistName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const token = localStorage.getItem('accessToken');
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    const fetchPlaylists = async () => {
        try {
            const response = await axios.get('playlists/playlists/', authHeader);
            setPlaylists(response.data);
        } catch (error) {
            console.error('Failed to fetch playlists');
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        try {
            await axios.post('playlists/playlists/', { name: playlistName }, authHeader);
            setPlaylistName('');
            fetchPlaylists();
        } catch (error) {
            alert('Failed to create playlist.');
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile || !selectedPlaylist) {
            alert('Please select file and playlist');
            return;
        }

        const formData = new FormData();
        formData.append('playlist', selectedPlaylist);
        formData.append('file', selectedFile);
        formData.append('file_type', selectedFile.type.startsWith('video') ? 'video' : 'image');

        try {
            await axios.post('playlists/media/upload/', formData, {
                ...authHeader,
                headers: { ...authHeader.headers, 'Content-Type': 'multipart/form-data' }
            });
            alert('File uploaded successfully!');
            fetchPlaylists();
        } catch (error) {
            alert('Failed to upload file.');
        }
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl mb-6">MyEchoes Dashboard</h1>

            <form onSubmit={handleCreatePlaylist} className="flex gap-4 mb-6">
                <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} placeholder="Playlist Name" className="p-2 rounded text-black" />
                <button type="submit" className="bg-blue-500 p-2 rounded hover:bg-blue-600">Create Playlist</button>
            </form>

            <form onSubmit={handleFileUpload} className="flex gap-4 mb-6">
                <select onChange={(e) => setSelectedPlaylist(e.target.value)} className="p-2 rounded text-black">
                    <option value="">Select Playlist</option>
                    {playlists.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                    ))}
                </select>
                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="p-2 rounded text-white" />
                <button type="submit" className="bg-green-500 p-2 rounded hover:bg-green-600">Upload File</button>
            </form>

            <div>
                <h2 className="text-2xl mb-4">Your Playlists:</h2>
                {playlists.map((playlist) => (
                    <div key={playlist.id} className="mb-4">
                        <h3 className="text-xl">{playlist.name}</h3>
                        <div className="flex gap-2 flex-wrap mt-2">
                            {playlist.media_files.map((media) => (
                                <div key={media.id}>
                                    {media.file_type === 'image' ? (
                                        <img src={media.file} alt="Uploaded" className="w-32 h-32 object-cover rounded" />
                                    ) : (
                                        <video src={media.file} controls className="w-32 h-32 rounded" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
