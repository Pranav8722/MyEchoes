import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const resp = await axios.get('playlists/');
      setSongs(resp.data);
    } catch (err) {
      console.error('Error fetching songs:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      await axios.post('playlists/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchSongs();
      setTitle('');
      setFile(null);
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <form onSubmit={handleUpload}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Song Title" required />
        <input type="file" onChange={e => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>

      <h2>Songs List</h2>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            {song.title} - <a href={song.file} target="_blank" rel="noopener noreferrer">Play</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
