# Frontend Deployment Guide

This document provides instructions for deploying the frontend application separately from the backend.

## Environment Configuration

### Local Development
For local development, create a `.env` file in the frontend root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Production Deployment
For production deployment, set the environment variables in your hosting platform:

```env
VITE_API_BASE_URL=https://your-backend-domain.com
```

## Deployment to Vercel

### Prerequisites
- Vercel account
- GitHub account
- Domain for frontend (e.g., `zyronsemiconductors.com`)

### Steps
1. Push the frontend code to a GitHub repository
2. Import the project to Vercel
3. In the Vercel dashboard, set the following environment variables:
   - `VITE_API_BASE_URL`: Your backend domain (e.g., `https://server.zyronsemiconductors.com`)
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add your custom domain in the Vercel dashboard
7. Update your DNS settings as per Vercel's instructions

## Deployment to Netlify

### Prerequisites
- Netlify account
- GitHub account
- Domain for frontend

### Steps
1. Push the frontend code to a GitHub repository
2. Connect the repository to Netlify
3. In the Netlify build settings, set the following environment variables:
   - `VITE_API_BASE_URL`: Your backend domain
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add your custom domain in the Netlify dashboard

## Deployment to Other Platforms

For other hosting platforms, ensure you:
1. Set the `VITE_API_BASE_URL` environment variable to point to your backend
2. Run `npm run build` to build the application
3. Serve the contents of the `dist` folder

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | The base URL for the backend API | `http://localhost:5000` |

## CORS Configuration

Make sure your backend is configured to allow requests from your frontend domain. In the backend `.env` file, ensure the `CLIENT_URL` variable includes your frontend domain:

```env
CLIENT_URL=https://your-frontend-domain.com
```

## Troubleshooting

### API Requests Failing
- Verify that `VITE_API_BASE_URL` is correctly set to your backend domain
- Check that your backend is accessible from the internet
- Ensure CORS is properly configured in your backend

### Build Errors
- Make sure all environment variables are properly set before building
- Verify that you're using the correct build command (`npm run build`)

### Mixed Content Issues (HTTP/HTTPS)
- Ensure both frontend and backend use the same protocol (both HTTPS or both HTTP)
- Update your environment variables accordingly