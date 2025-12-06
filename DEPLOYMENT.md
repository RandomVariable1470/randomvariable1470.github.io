# Deployment Guide

This guide explains how to deploy your full-stack portfolio.

## Architecture
- **Frontend**: GitHub Pages (Static Site)
- **Backend**: Render, Railway, or Heroku (Node.js API)
- **Database**: MongoDB Atlas (Cloud Database)

## Step 1: Database (MongoDB Atlas)
1. Creating a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (Shared/Free).
3. Create a Database User (e.g., `admin`).
4. **Network Access**: Allow IP `0.0.0.0/0` (to allow Render/Railway to connect).
5. Get Connection String: `mongodb+srv://admin:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`

## Step 2: Backend (Render.com)
1. Create a [Render](https://render.com) account.
2. Select **New Web Service**.
3. Connect your GitHub repository.
4. **Settings**:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. **Environment Variables**:
   - `MONGODB_URI`: (Your Atlas connection string)
   - `JWT_SECRET`: (Random strong string)
   - `GITHUB_TOKEN`: (Optional)

## Step 3: Frontend (GitHub Pages)
1. Open `client/vite.config.ts` and set `base` to `/<repository-name>/`.
2. Open `client/.env.production` and set `VITE_API_URL` to your Render Backend URL (e.g., `https://my-app.onrender.com/api`).
3. Deploy command:
   ```bash
   cd client
   npm run deploy
   ```
4. On GitHub, go to **Settings > Pages** and select `gh-pages` branch.

## Important Notes
- **CORS**: If you have CORS issues, update `server/index.js` `cors()` configuration to allow your GitHub Pages URL.
- **Admin**: You will need to re-run the `seedAuth.js` script pointing to your PRODUCTION database URI to create the admin user there, OR manually create the user in MongoDB Atlas.
