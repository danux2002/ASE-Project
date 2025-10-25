import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Send, RefreshCw, FileText, Lightbulb } from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeRequirements } from '../services/api';

const RequirementsAnalysis = () => {
  const [formData, setFormData] = useState({
    requirements: '',
    projectType: '',
    constraints: ''
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.requirements.trim()) {
      toast.error('Please provide project requirements');
      return;
    }

    setLoading(true);
    try {
      const response = await analyzeRequirements(formData);
      setAnalysis(response.data);
      toast.success('Requirements analyzed successfully!');
    } catch (error) {
      console.error('Error analyzing requirements:', error);
      toast.error(error.response?.data?.message || 'Failed to analyze requirements');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      requirements: '',
      projectType: '',
      constraints: ''
    });
    setAnalysis(null);
  };

  return (
    <div className="fade-in">
      {/* Header Section */}
      <div className="hero-section mb-5">
        <div className="d-flex align-items-center justify-content-center mb-4">
          <FileText size={48} className="text-primary me-3" />
          <h1 className="hero-title mb-0">Requirements Analysis</h1>
        </div>
        <p className="hero-subtitle">
          Transform your project ideas into structured requirements with AI-powered analysis
        </p>
      </div>

      <div className="grid grid-2 gap-4">
        {/* Input Form */}
        <div className="card">
          <div className="d-flex align-items-center mb-4">
            <Lightbulb size={24} className="text-primary me-2" />
            <h2 className="mb-0">Project Details</h2>
          </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="requirements" className="form-label">
              Project Requirements *
            </label>
            <textarea
              id="requirements"
              name="requirements"
              className="form-control textarea"
              placeholder="Describe your project requirements, features, and objectives..."
              value={formData.requirements}
              onChange={handleInputChange}
              rows={6}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectType" className="form-label">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              className="form-control"
              value={formData.projectType}
              onChange={handleInputChange}
            >
              <option value="">Select project type</option>
              <option value="web-application">Web Application</option>
              <option value="mobile-app">Mobile Application</option>
              <option value="desktop-app">Desktop Application</option>
              <option value="api-service">API/Microservice</option>
              <option value="data-platform">Data Platform</option>
              <option value="iot-system">IoT System</option>
              <option value="e-commerce">E-commerce Platform</option>
              <option value="cms">Content Management System</option>
              <option value="crm">Customer Relationship Management</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="constraints" className="form-label">
              Constraints & Limitations
            </label>
            <textarea
              id="constraints"
              name="constraints"
              className="form-control textarea"
              placeholder="Budget constraints, technology preferences, timeline, compliance requirements..."
              value={formData.constraints}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div className="d-flex gap-3">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Analyze Requirements'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="card">
          <LoadingSpinner message="Analyzing requirements with AI..." />
        </div>
      )}

      {analysis && (
        <div className="card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Analysis Results</h2>
            <small className="text-muted">
              Generated on {new Date(analysis.timestamp).toLocaleString()}
            </small>
          </div>
          
          <div className="mb-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <h4 className="mb-2">Input Summary</h4>
            <p><strong>Requirements:</strong> {analysis.input.requirements}</p>
            {analysis.input.projectType && (
              <p><strong>Project Type:</strong> {analysis.input.projectType}</p>
            )}
            {analysis.input.constraints && (
              <p><strong>Constraints:</strong> {analysis.input.constraints}</p>
            )}
          </div>

          <div className="analysis-content">
            <MarkdownRenderer content={analysis.analysis} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RequirementsAnalysis;