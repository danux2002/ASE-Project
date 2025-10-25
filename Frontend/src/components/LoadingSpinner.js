import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading">
      <Loader2 className="animate-spin" size={24} />
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default LoadingSpinner;