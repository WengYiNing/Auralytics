# Auralytics

<p align="center">
  <img src="frontend/public/logo.jpg" alt="Auralytics Logo" width="250">
</p>

Auralytics is an open-source project designed to provide in-depth insights into users' Spotify listening habits. By leveraging Spotify's API, Auralytics visualizes users' most frequently played tracks, albums, and genres over different time periods.

The production version of Auralytics is available at:  [**https://auralyticsmusic.com/**](https://auralyticsmusic.com/)

This repository contains the **open-source local version**, which allows developers to run Auralytics locally and contribute improvements. We actively review and merge valuable contributions into the production environment. Your contributions help enhance Auralytics for the entire community.

---

## 🗝️ Prerequisites: Obtaining Spotify Client ID & Client Secret

Auralytics relies on Spotify's API to fetch user data, so you will need a **Spotify Client ID** and **Client Secret** before running the project. Follow these steps to obtain them:

1. Go to [**Spotify for Developers**](https://developer.spotify.com/).
2. Log in with your Spotify account.
3. Go to [**Dashboard**](https://developer.spotify.com/dashboard).
4. Click **Create app**.
5. Fill in the required details and agree to Spotify’s terms (Redirect URIs needs to be align with the REDIRECT_URI in .env for Backend).
6. Once created, go to **Dashboard** and click on your app.
7. Click "Settings".
8. Copy the **Client ID** and **Client Secret**.
9. Add these credentials to the project's `.env` files (see below).

<p align="center">
  <img src="assets/Spotify API Example.png" alt="Spotify API Example" width="800">
</p>

For a more detailed guide, visit the [Spotify API Documentation](https://developer.spotify.com/documentation/web-api/).

---

## 🏗️ Technologies Used

Auralytics is built using the following technologies:

### **Frontend:**
- **React** (UI framework)
- **TypeScript** (strongly-typed JavaScript)
- **Tailwind CSS** (styling)
- **Vite** (build tool)

### **Backend:**
- **Node.js** (runtime environment)
- **Express.js** (server framework)
- **MongoDB** (database for storing user listening history)
- **Redis** (caching layer to reduce API calls)
- **Spotify OAuth 2.0** (authentication)

For more details on setup and development, please check the individual README files in the [`frontend`](./frontend/README.md) and [`backend`](./backend/README.md) directories.

---

## 🚀 Running the Project

Auralytics can be started using **two different methods**:

### **Option 1: Using Docker (Recommended)**
1. Clone the repository:
   ```sh
   git clone https://github.com/yourrepo/Auralytics.git
   cd Auralytics
   ```
2. Build and run containers:
   ```sh
   docker-compose up --build
   ```
3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

To stop the service, use:
```sh
docker-compose down
```

### **Option 2: Running Manually Without Docker**
1. **Start the backend:**
   ```sh
   cd backend
   npm install
   node server.js
   ```
   - Backend will run at `http://localhost:5000`

2. **Start the frontend:**
   ```sh
   cd frontend
   npm install
   npm start
   ```
   - Frontend will run at `http://localhost:3000`

> **Note:** Make sure MongoDB and Redis are running locally if not using Docker.

---

## 🤝 Contributing

We **enthusiastically welcome contributions** from the community! Every pull request (PR) is carefully reviewed, and we strive to incorporate meaningful improvements into the production environment.

### **How to Contribute:**
1. **Fork the repository**.
2. **Create a new branch** for your feature/fix.
3. **Make your changes** and test them locally.
4. **Submit a pull request** with a clear description.

Before submitting a PR, please ensure:
- Your code follows our **coding standards**.
- You have tested your changes thoroughly.
- You have updated any relevant documentation.

For more details, see our [Contribution Guidelines](./CONTRIBUTING.md).

---

## 📜 License

Auralytics is licensed under the **MIT License**. This means you are free to use, modify, and distribute the project, as long as you include the original license and copyright notice.

For full license details, check the [`LICENSE`](./LICENSE) file.

---

## 📩 Contact Us

If you have any questions or suggestions, feel free to reach out to us:

- **Email:** [support@auralytics.com](mailto:support@auralytics.com)
- **X (formerly Twitter):** [@Auralytics](https://x.com/Auralytics)

Thank you for your interest in Auralytics! We look forward to your contributions and hope you enjoy using and improving this project. 🎧
