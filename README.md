# Software Engineering Workbench

A comprehensive AI-powered software design automation tool that helps software engineers analyze requirements and generate optimal architecture solutions using Google's Gemini AI.

## Features

- **Requirements Analysis**: AI-powered analysis of project requirements with architectural recommendations
- **Architecture Generation**: Comprehensive system architecture generation with technology stack suggestions
- **Design Sessions**: Organize and track your design work with persistent sessions
- **AI Integration**: Powered by Google Gemini AI for intelligent design decisions
- **Modern UI**: Clean, responsive React.js interface

## Tech Stack

### Backend
- Node.js & Express.js
- Google Generative AI (Gemini)
- CORS, Helmet for security
- RESTful API design

### Frontend
- React.js 18
- React Router for navigation
- Axios for API calls
- React Markdown for content rendering
- Lucide React for icons
- React Hot Toast for notifications

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

## Setup Instructions

### 1. Clone and Navigate
```bash
cd "ASE-Project"
```

### 2. Backend Setup
```bash
cd Backend
npm install

# Configure environment variables
# Edit .env file and add your Gemini API key:
# GEMINI_API_KEY=your_actual_api_key_here

npm start
```

### 3. Frontend Setup (in a new terminal)
```bash
cd Frontend
npm install
npm start
```

### 4. Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file in the Backend folder

## Usage

1. **Start the Backend**: Run `npm start` in the Backend directory (port 5000)
2. **Start the Frontend**: Run `npm start` in the Frontend directory (port 3000)
3. **Access the Application**: Open http://localhost:3000 in your browser

### Features Overview

#### Requirements Analysis
- Input project requirements, constraints, and objectives
- Get AI-powered architectural recommendations
- Receive technology stack suggestions with reasoning

#### Architecture Generator
- Generate comprehensive system architectures
- Specify project features and scalability needs
- Get detailed implementation guidelines

#### Design Sessions
- Create and manage design sessions
- Track analyses and architectures over time
- Organize your design work effectively

## API Endpoints

### AI Endpoints
- `POST /api/ai/analyze-requirements` - Analyze project requirements
- `POST /api/ai/generate-architecture` - Generate system architecture
- `POST /api/ai/suggest-improvements` - Get improvement suggestions

### Design Session Endpoints
- `GET /api/design/sessions` - List all sessions
- `POST /api/design/sessions` - Create new session
- `GET /api/design/sessions/:id` - Get session details
- `PUT /api/design/sessions/:id` - Update session
- `DELETE /api/design/sessions/:id` - Delete session
- `POST /api/design/sessions/:id/analysis` - Add analysis to session
- `POST /api/design/sessions/:id/architecture` - Add architecture to session

## Project Structure

```
ASE/
├── Backend/
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   └── designRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Development

### Backend Development
```bash
cd Backend
npm install -g nodemon  # For auto-restart during development
npm run dev
```

### Frontend Development
```bash
cd Frontend
npm start  # Automatically opens browser and auto-reloads on changes
```

## Environment Variables

### Backend (.env)
```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for educational and commercial purposes.

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your Gemini API key is correctly set in the `.env` file
2. **CORS Issues**: The backend is configured to allow requests from localhost:3000
3. **Port Conflicts**: Backend runs on port 5000, frontend on port 3000
4. **Module Not Found**: Run `npm install` in both Backend and Frontend directories

### Getting Help

- Check the browser console for frontend errors
- Check the terminal running the backend for server errors
- Ensure both servers are running simultaneously
- Verify your Gemini API key is valid and has credits

## Future Enhancements

- User authentication and authorization
- Database integration for persistent storage
- Real-time collaboration features
- More AI models integration
- Export functionality for generated architectures
- Version control for design iterations
