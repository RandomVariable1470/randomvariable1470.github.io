# Portfolio Website (MERN Stack)

A standalone full-stack portfolio website built with React, Node.js, Express, and MongoDB.

## Features

- **Frontend**: React, Vite, TailwindCSS, Framer Motion, Three.js (via React Three Fiber).
- **Backend**: Node.js, Express, MongoDB.
- **Data**: Contact form submissions are stored in MongoDB. GitHub data is fetched via the GitHub API.

## Project Structure

- `client/`: Frontend application (Vite + React).
- `server/`: Backend API (Express + MongoDB).

## Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB**: You must have a MongoDB instance running locally (default: `mongodb://localhost:27017/portfolio`) or a connection string to a cloud provider.

## Getting Started

1. **Install Dependencies**
   Run this from the root directory to install dependencies for both client and server:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

2. **Environment Setup**
   The project comes with default `.env` files.
   - **Server**: `server/.env` (Configures Port and MongoDB URI)
   - **Client**: `client/.env` (Configures API URL)

   If you want to use a real GitHub token (to avoid rate limits), add `GITHUB_TOKEN` to `server/.env`.

3. **Run the Application**
   Start both backend and frontend concurrently:
   ```bash
   npm run dev
   ```
   - **Frontend**: http://localhost:8080
   - **Backend**: http://localhost:5000

## Deployment

### Frontend (Vercel/Netlify)
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
    - `VITE_API_URL`: URL of your deployed backend (e.g., `https://my-api.onrender.com/api`)

### Backend (Render/Railway/Heroku)
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `node index.js`
- Environment Variables:
    - `MONGODB_URI`: Production connection string.
    - `GITHUB_TOKEN`: Optional.
