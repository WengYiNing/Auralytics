import React, { useState, useEffect } from 'react';
import '../styles/Albums.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import spotifyLogo from '../image/Spotify_Primary_Logo_RGB_Black.png';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;


interface Album {
    name: string;
    albumImageUrl: string;
    release_date: string;
    artistName: string;
    logoUrl: string;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};

const MostListenedAlbums: React.FC = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [currentRange, setCurrentRange] = useState<string>('short_term');
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const fetchAlbums = async (range: string) => {
        try {
            const token = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token'); 
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${BASE_URL}/top-albums/${userId}/${range}`, {
                headers: { 'Authorization': `Bearer ${token}`,
                'x-refresh-token': refreshToken
            }
            });

            const formattedAlbums = response.data.map((album: any) => ({
                name: album.name,
                albumImageUrl: album.albumImageUrl,
                release_date: formatDate(album.release_date),
                artistName: album.artistName,
                logoUrl: album.logoUrl
            }));

            setAlbums(formattedAlbums);
        } catch (error) {
            console.error("Error fetching albums", error);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        } else {
            fetchAlbums(currentRange);
        }
    }, [isLoggedIn, navigate, currentRange]);

    const handleRangeClick = (range: string) => {
        setCurrentRange(range);
    };

    return (
        <div>
            <Header />
            <div className="header2">
                <h3>Top albums</h3>
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
                {albums.map((album, index) => (
                    <li key={index} className="album-item">
                        <span className="album-index">{index + 1}</span> 
                        <img src={album.albumImageUrl} alt={album.name} className="album-image" />
                        <div className="album-info">
                            <span className="album-name">{album.name}</span>
                            <span className="album-release-date">{album.release_date}</span>
                        </div>
                        <span className="album-artist">{album.artistName}</span>
                        <a href={album.logoUrl} target="_blank" rel="noopener noreferrer" className="spotify-logo-container">
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
};

export default MostListenedAlbums;
