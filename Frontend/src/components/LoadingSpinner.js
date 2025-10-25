import React from 'react';
import { Loader2, Brain } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', variant = 'default' }) => {
  const renderSpinner = () => {
    switch (variant) {
      case 'brain':
        return (
          <div className="d-flex flex-column align-items-center">
            <div className="feature-icon mb-3 pulse">
              <Brain size={32} />
            </div>
            <div className="d-flex align-items-center">
              <Loader2 className="animate-spin me-2" size={20} />
              <span className="loading-dots">{message}</span>
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div className="d-flex align-items-center justify-content-center">
            <Loader2 className="animate-spin" size={20} />
          </div>
        );
      default:
        return (
          <div className="d-flex align-items-center justify-content-center">
            <Loader2 className="animate-spin me-2" size={24} />
            <span>{message}</span>
          </div>
        );
    }
  };

  return (
    <div className="loading">
      {renderSpinner()}
    </div>
  );
};

export default LoadingSpinner;