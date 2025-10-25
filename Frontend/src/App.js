import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RequirementsAnalysis from './pages/RequirementsAnalysis';
import ArchitectureGenerator from './pages/ArchitectureGenerator';
import DesignSessions from './pages/DesignSessions';
import SessionDetail from './pages/SessionDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/requirements" element={<RequirementsAnalysis />} />
            <Route path="/architecture" element={<ArchitectureGenerator />} />
            <Route path="/sessions" element={<DesignSessions />} />
            <Route path="/sessions/:id" element={<SessionDetail />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;