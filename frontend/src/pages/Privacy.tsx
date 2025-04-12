import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Privacy.css';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation();

  const personalDataItems = t('privacy.collect.personal_data_items', { returnObjects: true }) as string[];
  const cookiesItems = t('privacy.collect.cookies_items', { returnObjects: true }) as string[];
  const usageItems = t('privacy.usage.items', { returnObjects: true }) as string[];
  const thirdPartyItems = t('privacy.thirdparty.items', { returnObjects: true }) as string[];

  return (
    <div>
      <Header />
      <div className='privacy-content'>
        <h2>{t('privacy.title')}</h2>

        <h4>{t('privacy.introduction.title')}</h4>
        <p>{t('privacy.introduction.content')}</p>

        <h4>{t('privacy.collect.title')}</h4>
        <p><strong>{t('privacy.collect.personal_data')}</strong></p>
        <ul>
          {Array.isArray(personalDataItems) && personalDataItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p>{t('privacy.collect.personal_data_footer')}</p>

        <p><strong>{t('privacy.collect.cookies')}</strong></p>
        <ul>
          {Array.isArray(cookiesItems) && cookiesItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p>{t('privacy.collect.cookies_footer')}</p>

        <h4>{t('privacy.usage.title')}</h4>
        <ul>
          {Array.isArray(usageItems) && usageItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4>{t('privacy.thirdparty.title')}</h4>
        <ul>
          {Array.isArray(thirdPartyItems) && thirdPartyItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <p>{t('privacy.thirdparty.footer')}</p>

        <h4>{t('privacy.retention.title')}</h4>
        <p>{t('privacy.retention.content')}</p>

        <h4>{t('privacy.children.title')}</h4>
        <p>{t('privacy.children.content')}</p>

        <h4>{t('privacy.accuracy.title')}</h4>
        <p>{t('privacy.accuracy.content')}</p>

        <h4>{t('privacy.changes.title')}</h4>
        <p>{t('privacy.changes.content')}</p>

        <h4>{t('privacy.contact.title')}</h4>
        <p>{t('privacy.contact.content')}</p>

        <br /><br />
        <p><strong>{t('privacy.last_updated')}</strong></p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
