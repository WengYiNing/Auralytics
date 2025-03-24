import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Privacy.css';

const PrivacyPolicy: React.FC = () => {

  return (
    <div>
      <Header />
      <div className='privacy-content'>
      <h2>Privacy Policy</h2>

      <h4>Introduction</h4>
      <p>
      Welcome to Auralytics. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service. Our service is an independent application that utilizes the Spotify API to provide insights and is not associated with Spotify AB, its partners, or associates.
      <br></br><br></br>
      By using our service, you agree to the collection and use of information in accordance with this policy.
      </p>
      <h4>Information We Collect</h4>
      <p>
      1. Personal Data<br></br><br></br>
      When you use our service, we may collect the following personal information:
      <br></br><br></br>
        <li>Email address</li>
        <li>Spotify ID</li>
        <li>API access token</li>
      <br></br>
      This information is collected to enable core functionalities and improve your user experience. We do not sell, trade, or share your personal information with third parties.
      <br></br><br></br>
      2. Cookies<br></br><br></br>
      We use cookies and similar tracking technologies to enhance user experience, analyze usage data, and serve personalized content and advertisements. Specifically, we use:
      <br></br><br></br>
      <li>Essential Cookies: Necessary for the website to function properly.</li>
      <li>Analytics Cookies: Provided by third-party services like Google Analytics to track user behavior and improve the service.</li>
      <li>Advertising Cookies: Used to deliver targeted ads through services such as Google Ads.</li>
      <br></br>
      You can manage or disable cookies in your browser settings, but this may impact some features of our service.
      </p>
      <h4>How We Use Your Data</h4>
      <p>
        We use the collected data for various purposes:
        <br></br><br></br>
        <li>To enable and maintain our service.</li>
        <li>To personalize your user experience.</li>
        <li>To detect, prevent, and address security or technical issues.</li>
        <li>For any other purposes disclosed at the time of collection or with your consent.</li>
        </p>
      <h4>Third-party Services</h4>
      <p>
      We integrate with third-party services, including:
        <br></br><br></br>
        <li>Spotify API: To fetch and display your Spotify-related data.</li>
        <li>Google Analytics: For site traffic analysis.</li>
        <li>Google Ads: For serving personalized ads.</li>
        <br></br>
      Please refer to the respective privacy policies of these services for more details.
      </p>
      <h4>Data Retention</h4>
      <p>
      Your data will retain in our database system only for 1 hours. After that, the data will expire and be automatically eliminated.
      </p>
      <h4>Children's Privacy</h4>
      <p>
      Our service is not directed to anyone under the age of 18. We do not knowingly collect personal data from children. If you believe that your child has provided personal information, please contact us immediately, and we will take steps to delete such data.
      </p>
      <h4>Data Accuracy Statement</h4>
      <p>
      While we strive to ensure accuracy, these insights may not perfectly reflect your listening habits and should be used for reference only.
      </p>
      <h4>Changes to This Privacy Policy</h4>
      <p>
      We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Continued use of the service after any changes constitute your acknowledgment of the updated policy.
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

export default PrivacyPolicy;
