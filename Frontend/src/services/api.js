import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 60000, // 60 seconds timeout for AI operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// AI Services
export const analyzeRequirements = (data) => {
  return api.post('/ai/analyze-requirements', data);
};

export const generateArchitecture = (data) => {
  return api.post('/ai/generate-architecture', data);
};

export const suggestImprovements = (data) => {
  return api.post('/ai/suggest-improvements', data);
};

// Design Session Services
export const getDesignSessions = () => {
  return api.get('/design/sessions');
};

export const getDesignSession = (id) => {
  return api.get(`/design/sessions/${id}`);
};

export const createDesignSession = (data) => {
  return api.post('/design/sessions', data);
};

export const updateDesignSession = (id, data) => {
  return api.put(`/design/sessions/${id}`, data);
};

export const deleteDesignSession = (id) => {
  return api.delete(`/design/sessions/${id}`);
};

export const addAnalysisToSession = (sessionId, data) => {
  return api.post(`/design/sessions/${sessionId}/analysis`, data);
};

export const addArchitectureToSession = (sessionId, data) => {
  return api.post(`/design/sessions/${sessionId}/architecture`, data);
};

// Health check
export const healthCheck = () => {
  return api.get('/health');
};

export default api;