# Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm
- Google Gemini API key

## Setup Steps

### 1. Install Dependencies
Run the installation script:
```bash
install.bat
```

Or manually:
```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

### 2. Configure API Key
1. Get your Gemini API key from: https://makersuite.google.com/app/apikey
2. Open `Backend/.env` file
3. Replace `your_gemini_api_key_here` with your actual API key

### 3. Start the Application

**Option 1: Use batch files (Windows)**
- Run `start-backend.bat` in one terminal
- Run `start-frontend.bat` in another terminal

**Option 2: Manual start**
```bash
# Terminal 1 - Backend
cd Backend
npm start

# Terminal 2 - Frontend  
cd Frontend
npm start
```

**Option 3: Start both together (requires concurrently)**
```bash
npm install
npm start
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features

### 🧠 Requirements Analysis
- Input project requirements
- Get AI-powered architectural analysis
- Technology stack recommendations

### 🏗️ Architecture Generator
- Generate system architectures
- Specify scalability needs
- Get implementation guidelines

### 📁 Design Sessions
- Create and manage design sessions
- Track analyses and architectures
- Organize design work

## API Endpoints

- POST `/api/ai/analyze-requirements` - Analyze requirements
- POST `/api/ai/generate-architecture` - Generate architecture
- GET `/api/design/sessions` - List design sessions
- POST `/api/design/sessions` - Create new session

## Troubleshooting

**Backend won't start:**
- Check if port 5000 is available
- Verify your Gemini API key is set correctly
- Ensure all dependencies are installed

**Frontend won't start:**
- Check if port 3000 is available
- Make sure backend is running first
- Clear npm cache: `npm cache clean --force`

**API calls failing:**
- Verify backend is running on port 5000
- Check browser console for errors
- Ensure CORS is properly configured

## Support
For issues or questions, check the README.md file for detailed documentation.