# Local Development Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
# Terminal 1 - Backend
cd server
npm install

# Terminal 2 - Frontend  
cd client
npm install
```

### 2. Create Environment Files

**server/.env**
```bash
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/obsidian
CLIENT_URL=http://localhost:5173
```

**client/.env.local**
```bash
VITE_API_URL=http://localhost:5000
```

### 3. Start Development Servers

**Terminal 1 - Backend**
```bash
cd server
npm run dev
```

Expected output:
```
✅ Database connected successfully
✅ Server is running on port 5000
📋 Frontend should use API_URL: http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

Expected output:
```
VITE v7.3.1  running at:

  ➜  Local:   http://localhost:5173/
```

### 4. Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Register" or "Login"
3. Open DevTools (F12) → Network tab
4. Try to register/login
5. Verify API calls go to `http://localhost:5000/api/auth/login`

---

## Troubleshooting

### Backend not connecting
```bash
# Check if MongoDB is running
# For MongoDB Atlas, verify connection string in .env
# Test with:
curl http://localhost:5000/
```

### Frontend can't reach backend
1. Check `.env.local` has correct `VITE_API_URL`
2. Run: `npm run build` in client folder to verify env vars work
3. Check browser console for error messages
4. Verify backend is actually running on port 5000

### CORS Error
- Update `CLIENT_URL` in backend `.env`
- Must exactly match frontend URL including port
- Restart backend after changing

### Port already in use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port:
PORT=5001 npm run dev
# Then update VITE_API_URL=http://localhost:5001
```

---

## Database Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB Community Edition
# Then run:
mongod
```

### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/obsidian
```

---

## VS Code Debug Setup (Optional)

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Server",
      "program": "${workspaceFolder}/server/index.js",
      "restart": true,
      "console": "integratedTerminal",
      "cwd": "${workspaceFolder}/server"
    }
  ]
}
```

Then click "Run and Debug" in VS Code.
