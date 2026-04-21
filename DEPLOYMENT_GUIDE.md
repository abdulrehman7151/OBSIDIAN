# Deployment Guide - OBSIDIAN

## Overview
This application consists of two separate deployments:
- **Frontend**: React + Vite (Vercel)
- **Backend**: Node.js + Express (Render, Railway, or similar)

---

## Step 1: Deploy Backend

### Option A: Using Render.com (Recommended)

1. **Create a Render account**: https://render.com
2. **Connect your GitHub repository**
3. **Create a new Web Service:**
   - Name: `obsidian-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm run dev` or `node index.js`
4. **Add Environment Variables** in Render dashboard:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   CLIENT_URL=https://your-vercel-domain.vercel.app
   API_PUBLIC_URL=https://your-render-domain.onrender.com
   ```
5. **Deploy** - Render will auto-deploy from your Git push

### Option B: Using Railway.app

1. **Create a Railway account**: https://railway.app
2. **Connect your GitHub**
3. **New Project → GitHub Repo**
4. **Set Environment Variables:**
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-uri
   CLIENT_URL=https://your-vercel-domain.vercel.app
   ```
5. **Deploy**

### Option C: Using Vercel (Full-Stack)

1. **Push your entire repo to GitHub** (with both client/ and server/ folders)
2. **Import in Vercel** and set as monorepo
3. **Configure Root Directory** to `server/`
4. **Set Environment Variables**

---

## Step 2: Get Your Backend URL

After deployment, Render/Railway will provide a public URL like:
```
https://obsidian-api-xyz.onrender.com
```

---

## Step 3: Deploy Frontend

### On Vercel:

1. **Go to Vercel Dashboard**: https://vercel.com
2. **New Project → Import your GitHub repo**
3. **Select root directory**: `client/`
4. **Environment Variables** (add before deployment):
   ```
   VITE_API_URL=https://obsidian-api-xyz.onrender.com
   ```
5. **Deploy**

After deployment, Vercel provides your frontend URL:
```
https://your-project.vercel.app
```

---

## Step 4: Update Backend CORS

Go back to your backend deployment and update:

```
CLIENT_URL=https://your-project.vercel.app
```

Then redeploy the backend.

---

## Testing the Connection

### 1. Test Backend Health
```bash
curl https://obsidian-api-xyz.onrender.com/
```

Expected response:
```json
{
  "message": "OBSIDIAN API is running...",
  "environment": "production",
  "version": "1.0.0"
}
```

### 2. Test in Browser DevTools
1. Open your deployed frontend in browser
2. Open DevTools (F12)
3. Go to Network tab
4. Try login/register
5. Check API calls - they should go to your backend URL, not localhost

### 3. Check Console for Errors
- Look for CORS errors
- Check if API_URL is correct
- Verify authentication tokens are being saved

---

## Common Issues & Solutions

### Issue 1: 404 NOT_FOUND
**Cause**: Frontend can't reach backend
**Solution**: 
- Verify `VITE_API_URL` is set in Vercel
- Verify backend is deployed and running
- Test backend URL directly in browser

### Issue 2: CORS Error
**Cause**: Backend CORS not allowing frontend origin
**Solution**:
- Update `CLIENT_URL` in backend environment variables
- Must match exact frontend URL (including https://)
- Redeploy backend

### Issue 3: Login fails with 401/403
**Cause**: JWT token or database issue
**Solution**:
- Verify MongoDB URI is correct
- Check backend logs in Render/Railway
- Ensure environment variables are set

### Issue 4: Cart not syncing
**Cause**: Authentication middleware failing
**Solution**:
- Verify token is being sent in headers
- Check authMiddleware.js logic
- Verify JWT_SECRET is consistent

---

## Environment Variables Reference

### Backend (.env)
```
PORT                    | Server port (default: 3000)
NODE_ENV               | development or production
MONGODB_URI            | Full MongoDB connection string
CLIENT_URL             | Frontend domain (for CORS)
API_PUBLIC_URL         | Public backend URL (for frontend config)
JWT_SECRET (optional)  | Secret for JWT tokens (if using custom secret)
```

### Frontend (.env.local or Vercel)
```
VITE_API_URL           | Backend API base URL
```

---

## Local Development Setup

### Terminal 1 - Backend
```bash
cd server
npm install
npm run dev
```

### Terminal 2 - Frontend
```bash
cd client
npm install
npm run dev
```

Visit: `http://localhost:5173`

---

## Production Checklist

- [ ] Backend deployed to Render/Railway/Heroku
- [ ] Backend URL is working (test with curl)
- [ ] MongoDB URI is production-ready
- [ ] Frontend `VITE_API_URL` is set to backend URL
- [ ] Backend `CLIENT_URL` matches frontend domain
- [ ] Tested login/register functionality
- [ ] Tested cart sync functionality
- [ ] No CORS errors in browser console
- [ ] No console errors on frontend
- [ ] Verified database connection works
- [ ] Backend returns JSON (not HTML error)

---

## Monitoring

### Render Dashboard
- View logs in real-time
- Monitor CPU/Memory usage
- Check deployment history

### Vercel Analytics
- Frontend performance metrics
- Error tracking
- Deploy history

### MongoDB Atlas
- Monitor connections
- Check database performance
- View authentication logs

---

## Need Help?

1. **Check logs first**: View backend logs in Render/Railway dashboard
2. **Test each component**: Backend URL separately, then frontend
3. **Use DevTools**: Check Network tab for API calls
4. **CORS issues**: Most common - double-check CLIENT_URL matches exactly
