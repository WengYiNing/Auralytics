import React, { useState, useEffect } from 'react';
import '../styles/Genres.css';  
import Header from '../components/Header';
import Footer from '../components/Footer';
import TimeRangeSelector from '../components/TimeRangeSelector';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import spotifyLogo from '../image/Spotify_Primary_Logo_RGB_Black.png';
import { useTranslation } from 'react-i18next';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const MostListenedGenres: React.FC = () => {
    const [genres, setGenres] = useState<{ genre: string; score: number; logoUrl: string; artistImageUrl: string}[]>([]);
    const [currentRange, setCurrentRange] = useState<string>('short_term');
    const { isLoggedIn } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const fetchGenres = async (range: string) => {
        try {
            const token = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token'); 
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${BASE_URL}/top-genres/${userId}/${range}`, {
                headers: { 'Authorization': `Bearer ${token}`,
                'x-refresh-token': refreshToken
            }
            });

            const formattedGenres = response.data
                .map((item: { genre: string, score: number, logoUrl: string, artistImageUrl: string}) => ({
                    genre: item.genre,
                    score: item.score,
                    logoUrl: item.logoUrl,
                    artistImageUrl: item.artistImageUrl
                }))
                .slice(0, 10); 

            setGenres(formattedGenres);
        } catch (error) {
            console.error("Error fetching genres", error);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        } else {
            fetchGenres(currentRange);
        }
    }, [isLoggedIn, navigate, currentRange]);

    const handleRangeClick = (range: string) => {
        setCurrentRange(range);
    };

    const maxScore = genres.length > 0 ? Math.max(...genres.map(g => g.score)) : 1;

    return (
        <div>
            <Header />
            <div className="header2">
                <h3>{t('genres.title')}</h3>
                <TimeRangeSelector 
                    currentRange={currentRange} 
                    onRangeChange={handleRangeClick} 
                />
            </div>

            <ul>
                {genres.map((genreData, index) => (
                    <li key={index} className="genre-item">
                        <div className="genre-info">
                            <span className="genre-index">{index + 1}</span> 
                                <div className="artistImage-container">
                                    <img src={genreData.artistImageUrl} alt={`Album cover for ${genreData.genre}`} className="artist-image" />
                                </div>
                            <span className="genre-name">{genreData.genre}</span>
                            <div className="progress-bar-container">
                                <div className="progress-bar" style={{ width: `${(genreData.score / maxScore) * 100}%` }}></div>
                            </div>
                        </div>
                        <a href={genreData.logoUrl} target="_blank" rel="noopener noreferrer" className="spotify-logo-container">
                            <img 
                                src={spotifyLogo} 
                                alt={t('genres.spotify_logo_alt')} 
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

export default MostListenedGenres;
