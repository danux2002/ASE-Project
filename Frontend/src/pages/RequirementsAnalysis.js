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
                placeholder="Describe your project requirements, features, and objectives in detail. Be as specific as possible about functionality, user needs, and business goals..."
                value={formData.requirements}
                onChange={handleInputChange}
                rows={8}
                required
              />
              <small className="text-muted mt-1">
                Tip: Include user stories, functional requirements, and any specific features you envision.
              </small>
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
                Constraints & Preferences
              </label>
              <textarea
                id="constraints"
                name="constraints"
                className="form-control textarea"
                placeholder="Budget constraints, technology preferences, timeline, compliance requirements, team expertise, scalability needs..."
                value={formData.constraints}
                onChange={handleInputChange}
                rows={4}
              />
              <small className="text-muted mt-1">
                Include budget, timeline, preferred technologies, compliance requirements, or any limitations.
              </small>
            </div>

            <div className="d-flex gap-3">
              <button 
                type="submit" 
                className="btn btn-lg flex-fill"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw size={20} className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Analyze Requirements
                  </>
                )}
              </button>
              <button 
                type="button" 
                onClick={handleClear} 
                className="btn btn-outline btn-lg"
                disabled={loading}
              >
                <RefreshCw size={20} />
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="card">
          <h2 className="mb-4">Analysis Results</h2>
          {loading ? (
            <LoadingSpinner 
              message="Analyzing your requirements with AI" 
              variant="brain" 
            />
          ) : analysis ? (
            <div className="analysis-results">
              <div className="success mb-4">
                <strong>Analysis Complete!</strong> Your requirements have been processed and analyzed.
              </div>
              <MarkdownRenderer content={analysis.analysis} />
            </div>
          ) : (
            <div className="text-center p-5">
              <FileText size={64} className="text-muted mb-3" />
              <h4 className="text-muted mb-2">No Analysis Yet</h4>
              <p className="text-muted">
                Fill out the form on the left and click "Analyze Requirements" to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequirementsAnalysis;