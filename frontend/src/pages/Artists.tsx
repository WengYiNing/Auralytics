import React, { useState, useEffect } from 'react';
import '../styles/Artists.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TimeRangeSelector from '../components/TimeRangeSelector';
import axios from 'axios';
import { useAuth } from '../AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import spotifyLogo from '../image/Spotify_Primary_Logo_RGB_Black.png';
import { useTranslation } from 'react-i18next';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

interface InfoModalProps {
    text: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ text }) => {
    return (
        <div className="info-modal" style={{
            position: 'absolute',
            top: '30px',
            left: '0',
            backgroundColor: 'white',
            padding: '10px',
            zIndex: 1000,
            border: '0px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <p>{text}</p>
        </div>
    );
};

interface Artists {
    artistId: string;
    name: string;
    genres: string[];
    popularity: string;
    artistImageUrl: string;
    logoUrl: string;
}

const MostListenedArtists: React.FC = () => {
    const [artists, setArtists] = useState<Artists[]>([]);
    const [currentRange, setCurrentRange] = useState<string>('short_term');
    const { isLoggedIn } = useAuth(); 
    const navigate = useNavigate();
    const [isModalVisible, setModalVisible] = useState(false);
    const { t } = useTranslation();

    const fetchArtists = async (range: string) => {
        try {
            const token = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token'); 
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${BASE_URL}/top-artists/${userId}/${range}`, {
                headers: { 'Authorization': `Bearer ${token}`,
                'x-refresh-token': refreshToken
            }
            });

            const formattedArtists = response.data.map((artist: any) => ({
            artistId: artist.id,
            name: artist.name,
            artistImageUrl: artist.artistImageUrl,
            genres: artist.genres ? artist.genres.split(',') : [],
            popularity: artist.popularity,
            logoUrl: artist.logoUrl
            }));

            setArtists(formattedArtists);
        } catch (error) {
            console.error("Error fetching tracks", error);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/'); 
        } else {
            fetchArtists(currentRange);
        }
    }, [isLoggedIn, navigate, currentRange]);

    const handleRangeClick = (range: string) => {
        setCurrentRange(range);
    };

    return (
        <div>
            <Header />
            <div className="header2">
                <h3>{t('artists.title')}</h3>
                <TimeRangeSelector 
                    currentRange={currentRange} 
                    onRangeChange={handleRangeClick} 
                />
            </div>
            <div className="info-session">
                <h5 className="header-popularity">{t('artists.popularity')}</h5>
                <div 
                    className="info-icon-container" 
                    onMouseEnter={() => setModalVisible(true)} 
                    onMouseLeave={() => setModalVisible(false)}
                    style={{ position: 'relative', display: 'inline-block' }}
                >
                    {FaInfoCircle({ className: 'circle' })}
                    {isModalVisible && (
                        <InfoModal text={t('artists.popularity_description')} />
                    )}
                </div>
            </div>

            <ul className="content-item">
                {artists.map((artist, index) => (
                    <li key={artist.artistId} className="artist-item"> 
                        <span className="artist-rank">{index + 1}</span>
                        <img src={artist.artistImageUrl} alt={artist.name} className="artist-image" />
                        <div className="artist-info">
                            <span className="artist-name">{artist.name}</span>
                            <span className="artist-genre">{artist.genres.length > 0 ? artist.genres[0] : 'Unknown'}</span>
                        </div>
                        <span className="artist-popularity">{artist.popularity}</span>
                        <a href={artist.logoUrl} target="_blank" rel="noopener noreferrer" className="spotify-logo-container">
                            <img 
                                src={spotifyLogo} 
                                alt={t('artists.spotify_logo_alt')}  
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

export default MostListenedArtists;
