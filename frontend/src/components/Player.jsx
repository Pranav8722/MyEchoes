import React from 'react';

const Player = ({ currentSong, isPlaying, togglePlay }) => {
    return (
        <div className="fixed bottom-0 w-full bg-gray-800 text-white flex items-center justify-between px-4 py-2">
            <div>
                {currentSong ? <p>Now Playing: {currentSong}</p> : <p>No song selected</p>}
            </div>
            <button onClick={togglePlay} className="bg-green-500 px-4 py-2 rounded">
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default Player;
