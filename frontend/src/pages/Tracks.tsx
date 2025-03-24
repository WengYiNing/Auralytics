import React, { useState, useEffect } from 'react';
import '../styles/Tracks.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../AuthContext'; 
import { useNavigate } from 'react-router-dom';
import spotifyLogo from '../image/Spotify_Primary_Logo_RGB_Black.png';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

interface Track {
    trackId: string;
    name: string;
    artistName: string;
    albumName: string;
    albumImageUrl: string;
    logoUrl: string;
}

const MostListenedTracks: React.FC = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [currentRange, setCurrentRange] = useState<string>('short_term');
    const { isLoggedIn } = useAuth(); 
    const navigate = useNavigate();

    const fetchTracks = async (range: string) => {
        try {
            const token = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token'); 
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${BASE_URL}/top-tracks/${userId}/${range}`, {
                headers: { 'Authorization': `Bearer ${token}`,
                'x-refresh-token': refreshToken
            }
            });
            console.log("Data received from backend: ", response.data);
            const formattedTracks = response.data.map((track: any) => ({
                trackId: track.trackId,
                name: track.name,
                artistName: track.artistName,
                albumName: track.albumName,
                albumImageUrl: track.albumImageUrl,
                logoUrl: track.logoUrl
            }));
    
            setTracks(formattedTracks);
        } catch (error) {
            console.error("Error fetching tracks", error);
        }
    };
    

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/'); 
        } else {
            fetchTracks(currentRange);
        }
    }, [isLoggedIn, navigate, currentRange]);

    const handleRangeClick = (range: string) => {
        setCurrentRange(range);
    };

    return (
        <div>
            <Header />
            <div className="header2">
                <h3>Top tracks</h3>
                <div className="time-range">
                    <button
                        onClick={() => handleRangeClick('short_term')}
                        className={currentRange === 'short_term' ? 'active' : 'inactive'}
                    >
                        Last 1 month
                    </button>
                    <button
                        onClick={() => handleRangeClick('medium_term')}
                        className={currentRange === 'medium_term' ? 'active' : 'inactive'}
                    >
                        Last 6 months
                    </button>
                    <button
                        onClick={() => handleRangeClick('long_term')}
                        className={currentRange === 'long_term' ? 'active' : 'inactive'}
                    >
                        Last 12 months
                    </button>
                </div>
            </div>
            <ul>
                {tracks.map((track, index) => (
                    <li key={track.trackId} className="track-item">
                        <span className="track-rank">{index + 1}</span>
                        <img src={track.albumImageUrl} alt={track.albumName} className="album-image" />
                        <div className="track-info">
                            <span className="track-name">{track.name}</span>
                            <span className="track-album">{track.albumName}</span>
                        </div>
                        <span className="track-artist">{track.artistName}</span>
                        <a href={track.logoUrl} target="_blank" rel="noopener noreferrer" className="spotify-logo-container">
                            <img 
                                src={spotifyLogo} 
                                alt="Spotify Logo" 
                                className="spotify-logo" 
                            />
                        </a>
                    </li>
                ))}
            </ul>
            <Footer/>
        </div>
    );
}

export default MostListenedTracks;
