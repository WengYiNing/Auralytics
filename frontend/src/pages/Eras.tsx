import React, { useState, useEffect } from 'react';
import '../styles/Eras.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import spotifyLogo from '../image/Spotify_Primary_Logo_RGB_Black.png';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

interface Decade {
    decade: string;
    score: number;
    topSong: {
        name: string;
        albumImageUrl: string;
        logoUrl: string;
    };
}

const MostListenedDecades: React.FC = () => {
    const [decades, setDecades] = useState<Decade[]>([]);
    const [currentRange, setCurrentRange] = useState<string>('short_term');
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const fetchDecades = async (range: string) => {
        try {
            const token = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token'); 
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${BASE_URL}/track-decades/${userId}/${range}`, {
                headers: { 'Authorization': `Bearer ${token}`,
                'x-refresh-token': refreshToken
            }
            });
    
            const data = response.data;
            if (data.decadeScores && data.topSongsByDecade) {
                const formattedDecades = Object.keys(data.decadeScores)
                    .map(decade => ({
                        decade,
                        score: data.decadeScores[decade],
                        topSong: {
                            name: data.topSongsByDecade[decade].name,
                            albumImageUrl: data.topSongsByDecade[decade].albumImageUrl,
                            logoUrl: data.topSongsByDecade[decade].logoUrl
                        }
                    }))
                    .sort((a, b) => b.score - a.score) 
                    .slice(0, 5);
    
                setDecades(formattedDecades); 
            } else {
                console.error("Unexpected response format, expected an object with decadeScores and topSongsByDecade");
                setDecades([]); 
            }
        } catch (error) {
            console.error("Error fetching decades", error);
            setDecades([]); 
        }
    };
    

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        } else {
            fetchDecades(currentRange);
        }
    }, [isLoggedIn, navigate, currentRange]);

    const handleRangeClick = (range: string) => {
        setCurrentRange(range);
    };

    const maxScore = decades.length > 0 ? Math.max(...decades.map(d => d.score)) : 1;

    return (
        <div>
            <Header />
            <div className="header2">
                <h3>Top eras</h3>
                <div className="time-range">
                    <button onClick={() => handleRangeClick('short_term')} className={currentRange === 'short_term' ? 'active' : 'inactive'}>
                        Last 1 month
                    </button>
                    <button onClick={() => handleRangeClick('medium_term')} className={currentRange === 'medium_term' ? 'active' : 'inactive'}>
                        Last 6 months
                    </button>
                    <button onClick={() => handleRangeClick('long_term')} className={currentRange === 'long_term' ? 'active' : 'inactive'}>
                        Last 12 months
                    </button>
                </div>
            </div>

            {decades.length > 0 && (
            <ul>
                {decades.map((decadeData, index) => (
                    <li key={index} className="decade-item">
                        <div className="decade-info">
                            <span className="decade-index">{index + 1}</span> 
                            <div className="album-container">
                                <img
                                    src={decadeData.topSong.albumImageUrl}
                                    alt={`Album cover for ${decadeData.topSong.name}`}
                                    className="album-image"
                                />
                            </div>
                            <span className="decade-name">{decadeData.decade}</span>
                            <div className="decade-progress-bar-container">
                                <div
                                    className="decade-progress-bar"
                                    style={{ width: `${(decadeData.score / maxScore) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                        <a
                            href={decadeData.topSong.logoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="spotify-logo-container"
                        >
                            <img
                                src={spotifyLogo}
                                alt="Spotify Logo"
                                className="spotify-logo"
                            />
                        </a>
                    </li>
                ))}
            </ul>
             )}
            <Footer/>
        </div>
    );
};

export default MostListenedDecades;
