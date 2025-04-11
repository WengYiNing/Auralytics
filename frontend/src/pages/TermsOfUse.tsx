import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Privacy.css';
import { useTranslation } from 'react-i18next';

const TermsOfUse: React.FC = () => {
  const { t } = useTranslation();

  const eligibilityItems = t('terms.eligibility.items', { returnObjects: true }) as string[];
  const responsibilitiesItems = t('terms.responsibilities.items', { returnObjects: true }) as string[];
  const responsibilitiesSubitems = t('terms.responsibilities.subitems', { returnObjects: true }) as string[];
  const prohibitedItems = t('terms.prohibited.items', { returnObjects: true }) as string[];
  const ipItems = t('terms.ip.items', { returnObjects: true }) as string[];
  const liabilityItems = t('terms.liability.items', { returnObjects: true }) as string[];
  const liabilitySubitems = t('terms.liability.subitems', { returnObjects: true }) as string[];
  const terminationItems = t('terms.termination.items', { returnObjects: true }) as string[];

  console.log('responsibilities.items', responsibilitiesItems);

  return (
    <div>
      <Header />
      <div className='privacy-content'>
        <h2>{t('terms.title')}</h2>

        <h4>{t('terms.introduction.title')}</h4>
        <p>{t('terms.introduction.content')}</p>

        <h4>{t('terms.eligibility.title')}</h4>
        <ul>
          {Array.isArray(eligibilityItems) && eligibilityItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4>{t('terms.responsibilities.title')}</h4>
        <p>{t('terms.responsibilities.intro')}</p>
        <ul>
          {Array.isArray(responsibilitiesItems) && responsibilitiesItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4>{t('terms.prohibited.title')}</h4>
        <ul>
          {Array.isArray(prohibitedItems) && prohibitedItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4>{t('terms.ip.title')}</h4>
        <p>{t('terms.ip.content')}</p>
        <ul>
          {Array.isArray(ipItems) && ipItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4>{t('terms.liability.title')}</h4>
        <p>{t('terms.liability.intro')}</p>
        <ul>
          {Array.isArray(liabilityItems) && liabilityItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <ul>
          {Array.isArray(liabilitySubitems) && liabilitySubitems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4>{t('terms.termination.title')}</h4>
        <ul>
          {Array.isArray(terminationItems) && terminationItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h4>{t('terms.contact.title')}</h4>
        <p>{t('terms.contact.content')}</p>

        <br /><br />
        <p><strong>{t('terms.last_updated')}</strong></p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
