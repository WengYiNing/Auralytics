import React from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';

// 定義 SEOProps 型別
interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  const siteUrl = "https://auralyticsmusic.com";
  const ogImage = "https://auralyticsmusic.com/logo-v1.jpg";
  const defaultDescription = "Discover your unique music story. Explore your top tracks, artists, genres, and musical eras. Dive into your personalized Spotify insights!";
  const defaultTitle = "Auralytics: Your fascinating music stats for Spotify";

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={defaultDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image:secure_url" content={image || ogImage} />
        <meta property="og:url" content={url || siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || defaultTitle} />
        <meta name="twitter:description" content={description || defaultDescription} />
        <meta name="twitter:image" content={image || ogImage} />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;
