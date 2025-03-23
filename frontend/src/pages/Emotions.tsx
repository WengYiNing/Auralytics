import React, { useState, useEffect } from 'react';
import '../styles/Emotions.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const TrackAnalysis: React.FC = () => {
    const [analysisData, setAnalysisData] = useState<{ 
        acousticness: number; 
        danceability: number; 
        energy: number; 
        instrumentalness: number; 
        liveness: number; 
        valence: number; 
        speechiness: number;
    } | null>(null);
    const [currentRange, setCurrentRange] = useState<string>('short_term');
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const fetchTrackAnalysis = async (range: string) => {
        try {
            const token = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token'); 
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`https://auralyticsmusic.com/.netlify/functions/track-analysis/${userId}/${range}`, {
                headers: { 'Authorization': `Bearer ${token}`,
                'x-refresh-token': refreshToken
            }
            });

            setAnalysisData(response.data);  // 儲存後端返回的分析數據
        } catch (error) {
            console.error("Error fetching track analysis", error);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
        } else {
            fetchTrackAnalysis(currentRange);
        }
    }, [isLoggedIn, navigate, currentRange]);

    const handleRangeClick = (range: string) => {
        setCurrentRange(range);
        fetchTrackAnalysis(range);
    };

    if (!analysisData) {
        return <div>Loading...</div>;
    }

    const maxScore = 1; // 所有音頻特徵的範圍都是 0 到 1，所以這裡設定最大值為 1

    return (
        <div>
            <Header />
            <div className="header2">
                <h3>Audio Feature Analysis</h3>
                <div className="time-range">
                    <button onClick={() => handleRangeClick('short_term')}
                            className={currentRange === 'short_term' ? 'active' : 'inactive'}>
                        Last 1 month
                    </button>
                    <button onClick={() => handleRangeClick('medium_term')}
                            className={currentRange === 'medium_term' ? 'active' : 'inactive'}>
                        Last 6 months
                    </button>
                    <button onClick={() => handleRangeClick('long_term')}
                            className={currentRange === 'long_term' ? 'active' : 'inactive'}>
                        Last 12 months
                    </button>
                </div>
            </div>

            <ul>
                <li className="genre-item">
                    <div className="genre-info">
                        <span className="genre-name">Acousticness</span>
                        <div className="emotion-progress-bar-container">
                            <div className="emotion-progress-bar" style={{ width: `${(analysisData.acousticness / maxScore) * 100}%` }}></div>
                        </div>
                    </div>
                </li>
                <li className="genre-item">
                    <div className="genre-info">
                        <span className="genre-name">Danceability</span>
                        <div className="emotion-progress-bar-container">
                            <div className="emotion-progress-bar" style={{ width: `${(analysisData.danceability / maxScore) * 100}%` }}></div>
                        </div>
                    </div>
                </li>
                <li className="genre-item">
                    <div className="genre-info">
                        <span className="genre-name">Energy</span>
                        <div className="emotion-progress-bar-container">
                            <div className="emotion-progress-bar" style={{ width: `${(analysisData.energy / maxScore) * 100}%` }}></div>
                        </div>
                    </div>
                </li>
                <li className="genre-item">
                    <div className="genre-info">
                        <span className="genre-name">Instrumentalness</span>
                        <div className="emotion-progress-bar-container">
                            <div className="emotion-progress-bar" style={{ width: `${(analysisData.instrumentalness / maxScore) * 100}%` }}></div>
                        </div>
                    </div>
                </li>
                <li className="genre-item">
                    <div className="genre-info">
                        <span className="genre-name">Liveness</span>
                        <div className="emotion-progress-bar-container">
                            <div className="emotion-progress-bar" style={{ width: `${(analysisData.liveness / maxScore) * 100}%` }}></div>
                        </div>
                    </div>
                </li>
                <li className="genre-item">
                    <div className="genre-info">
                        <span className="genre-name">Valence</span>
                        <div className="emotion-progress-bar-container">
                            <div className="emotion-progress-bar" style={{ width: `${(analysisData.valence / maxScore) * 100}%` }}></div>
                        </div>
                    </div>
                </li>
                <li className="genre-item">
                    <div className="genre-info">
                        <span className="genre-name">Speechiness</span>
                        <div className="emotion-progress-bar-container">
                            <div className="emotion-progress-bar" style={{ width: `${(analysisData.speechiness / maxScore) * 100}%` }}></div>
                        </div>
                    </div>
                </li>
            </ul>
            <Footer/>
        </div>
    );
};

export default TrackAnalysis;
