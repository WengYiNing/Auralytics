import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Privacy.css';

const TermsOfUse: React.FC = () => {

  return (
    <div>
      <Header />
      <div className='privacy-content'>
      <h2>Terms of Use</h2>

      <h4>Introduction</h4>
      <p>
      Welcome to Auralytics! By accessing or using our website, you agree to be bound by these Terms of Use. If you do not agree with any part of these Terms, please do not use our service.
      <br></br><br></br>
      Our service provides Spotify-related data insights for personal, non-commercial use. We are an independent platform and are not affiliated, endorsed, or sponsored by Spotify AB or any of its partners.
      </p>
      <h4>Eligibility</h4>
      <p>
      To use our service, you must:
        <br></br><br></br>
        <li>Be at least 18 years old.</li>
        <li>Have a valid Spotify account to connect with our service.</li>
        <li>Agree to comply with these Terms and any applicable laws or regulations.</li>
      </p>
      <h4>User Responsibilities</h4>
      <p>
      By using our service, you agree to:
        <br></br><br></br>
        1. Use the service only for lawful purposes and in compliance with these Terms.<br></br><br></br>
        2. Provide accurate, complete, and up-to-date information when using the service.<br></br><br></br>
        3. Refrain from:<br></br><br></br>
        <li>Attempting to hack, disrupt, or damage the website or its services.</li>
        <li>Using automated tools (e.g., bots, scrapers) to collect data from our website.</li>
        <li>Misusing the Spotify API data provided through our service.</li>
        </p>
        <h4>Prohibited Activities</h4>
        <p>
        You are strictly prohibited from:
        <br></br><br></br>
        <li>Modifying, distributing, or reproducing any part of our website or its content without permission.</li>
        <li>Using the service to engage in fraudulent, illegal, or unauthorized activities.</li>
        <li>Reselling or commercializing the data or insights provided by our service.</li>
        </p>
        <h4>Intellectual Property</h4>
        <p>
        All content on our website, including but not limited to designs, text, graphics, logos, and software, is the property of Auralytics and is protected by intellectual property laws. <br></br>
        <br></br>
        You may not:<br></br><br></br>
        <li>Copy, distribute, or publicly display our content without prior written consent.</li>
        <li>Use our branding or trademarks in any manner without authorization.</li>
        </p>
        <h4>Limitation of Liability</h4>
        <p>
        To the fullest extent permitted by law:
        <br></br><br></br>
        1. Auralytics is provided "as is" and "as available" without warranties of any kind, express or implied.<br></br><br></br>
        2. We are not liable for any damages, including but not limited to:<br></br><br></br>
        <li>Loss of data or profits.</li>
        <li>Service interruptions or technical issues.</li>
        <li>Any unauthorized access to your personal data.</li>
        </p>
        <h4>Termination</h4>
        <p>
        We reserve the right to:<br></br><br></br>
        <li>Suspend or terminate your access to the service at any time, without notice, for violating these Terms.</li>
        <li>Modify or discontinue any aspect of the service without prior notice.</li>
        </p>
        <h4>Contact Us</h4>
        <p>
        For any further information, please contact us via musicinsightsforspotify@gmail.com.
      </p>
      <br></br><br></br>
      <p><strong>Last Updated: December 24, 2024</strong></p>

      </div>
      <Footer />
    </div>
  );
}

export default TermsOfUse;
