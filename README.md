# Auralytics
[![Awesome](https://awesome.re/badge.svg)](https://awesome.re) 
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE) 

<p align="center">
  <img src="assets/logo.png" alt="Auralytics Logo" width="150">
</p>

Auralytics is an open-source project designed to provide in-depth insights into users' Spotify listening habits. By leveraging Spotify's API, Auralytics provides users with their  top tracks, artists, albums, genres, and musical eras.

You are very welcome to try our official service—the production version of Auralytics is available at:  [**https://auralyticsmusic.com**](https://auralyticsmusic.com)

This repository contains the **open-source local version**, allowing developers to run Auralytics locally and contribute improvements. We actively review and merge valuable contributions into the production environment. Your contributions help enhance Auralytics for the entire community.

---

## 📑 Table of Contents

- [🗝️ Prerequisites: Obtaining Spotify Client ID & Client Secret](#️-prerequisites-obtaining-spotify-client-id--client-secret)
- [💻 Tech Stack](#-tech-stack)
- [🚀 Running the Project](#-running-the-project)
  - [Clone the repository](#clone-the-repository)
  - [Create the `.env` files](#create-the-env-files)
  - [Start the project](#start-the-project)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📩 Contact Us](#-contact-us)

---
<p align="center">
  <img src="assets/Auralytics landing page demo.png" alt="demo" width="800">
</p>

## 🗝️ Prerequisites: Obtaining Spotify Client ID & Client Secret

Auralytics relies on Spotify's API to fetch user data, so you will need a **Spotify Client ID** and **Client Secret** before running the project. Please follow the steps we carefully organized to obtain them:

1. Go to [**Spotify for Developers**](https://developer.spotify.com/).
2. Log in with your Spotify account (no need to be Premium).
3. Go to [**Dashboard**](https://developer.spotify.com/dashboard).
4. Click **Create app**.
5. Fill in the required details and agree to Spotify’s terms (Redirect URIs must be align with the REDIRECT_URI in .env for Backend).
6. Once created, go to **Dashboard** and click on your app.
7. Click "Settings".
8. Copy the **Client ID** and **Client Secret**.
9. Add these credentials to the project's `.env` files (see below).

<p align="center">
  <img src="assets/Spotify API Example.png" alt="Spotify API Example" width="800">
</p>

For a more detailed guide, please visit the [Spotify API Documentation](https://developer.spotify.com/documentation/web-api/).

---

## 💻 Tech Stack

Auralytics is built using the following technologies:

### **Frontend:**
- **React** (UI framework)
- **TypeScript** (strongly-typed JavaScript)
- **CSS** (custom styling)
- **Create React App (CRA)** (build tool)

### **Backend:**
- **Node.js** (runtime environment)
- **Express.js** (server framework)
- **Redis** (caching layer to reduce API calls)
- **Spotify OAuth 2.0** (authentication)

---

## 🚀 Running the Project

### Prerequisites

Before starting, make sure you have the following installed on your system:

- **Git**: [Download and install Git](https://git-scm.com/downloads)
- **Node.js** and **npm**: [Download and install Node.js](https://nodejs.org/en) (npm comes with Node.js)
- **Docker** (optional, if you prefer using Docker): [Download and install Docker](https://www.docker.com/get-started)

### Clone the repository

```sh
git clone https://github.com/WengYiNing/Auralytics
cd Auralytics
```

### Create the `.env` files

This project requires an `.env` file to run. Before starting the application, please make sure to create the `.env` files and add .env to .gitignore to avoid committing sensitive information.

#### For macOS/Linux Developers

**Backend Steps**

1. Navigate to the `backend/` directory:
   ```sh
   cd backend
   ```
2. Copy the .env.example file to create a new one:
   ```sh
   cp .env.example .env
   ```
3. Open the .env file and configure the necessary values:
   ```sh
   nano .env
   ```
4. Save and exit (Ctrl + X, then Y, then Enter).

**Frontend Steps**

1. Navigate to the `frontend/` directory:
   ```sh
   cd ../frontend
   ```
2. Copy the .env.example file to create a new one:
   ```sh
   cp .env.example .env
   ```
3. Open the .env file and configure the necessary values:
   ```sh
   nano .env
   ```
4. Save and exit (Ctrl + X, then Y, then Enter).

#### For Windows Developers

**Backend Steps**

1. Navigate to the `backend/` directory:
   ```powershell
   cd backend
   ```
2. Copy the .env.example file to create a new one:
   ```powershell
   copy .env.example .env
   ```
3. Open the .env file and configure the necessary values using Notepad or another text editor:
   ```powershell
   notepad .env
   ```
4. Save and close the file.

**Frontend Steps**

1. Navigate to the `frontend/` directory:
   ```powershell
   cd ../frontend
   ```
2. Copy the .env.example file to create a new one:
   ```powershell
   copy .env.example .env
   ```
3. Open the .env file and configure the necessary values:
   ```powershell
   notepad .env
   ```
4. Save and close the file.

---

### Start the project

Auralytics can be started using two different methods:

#### Option 1: Using Docker

1. Back to root path:
   ```sh
   cd Auralytics
   ```
2. Build and run containers:
   ```sh
   docker compose up --build
   ```
3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8888`

To stop the service, use "Ctrl + C". Then input:

```sh
docker compose down
```

---

#### Option 2: Running Manually Without Docker

##### For macOS/Linux Developers (using terminal)

1. Back to root path:
   ```sh
   cd Auralytics
   ```

2. Start the backend:

   ```sh
   cd backend
   npm install
   node server.js
   ```

   - Backend will run at `http://localhost:8888`

3. Start the frontend:

   ```sh
   cd frontend
   npm install
   npm start
   ```

   - Frontend will run at `http://localhost:3000`

##### For Windows Developers (using PowerShell)

1. Back to root path:
   ```powershell
   cd Auralytics
   ```

2. Start the backend:

   ```powershell
   cd backend
   npm install
   node server.js
   ```

   - Backend will run at `http://localhost:8888`

3. Start the frontend:

   ```powershell
   cd frontend
   npm install
   npm start
   ```

   - Frontend will run at `http://localhost:3000`

> Note: Make sure Redis is running locally if not using Docker.

---

## 🤝 Contributing

We **enthusiastically welcome contributions** from the community! Every pull request (PR) is carefully reviewed, and we strive to incorporate meaningful improvements into the production environment.

### **How to Contribute:**
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Make sure to follow the existing project structure to make you change and test them locally.
4. Update the relevant documentations.
5. Submit a pull request with a clear description.

---

## 📜 License

Auralytics is licensed under the **Apache License 2.0**. You are free to use, modify, and distribute the project, as long as you comply with the terms of the license, including proper attribution and inclusion of the license notice.

For full license details, check the [`LICENSE`](./LICENSE) file.

---

## 📩 Contact Us

If you have any questions or suggestions, feel free to reach out to us:

- **Email:** [musicinsightsforspotify@gmail.com](musicinsightsforspotify@gmail.com)
- **X:** [@AuralyticsMusic](https://x.com/AuralyticsMusic)

Thank you for your interest in Auralytics! We look forward to your contributions and hope you enjoy using and improving this project. 🎧
