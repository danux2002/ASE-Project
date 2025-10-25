import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Layers, Plus, X, Zap, RefreshCw } from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateArchitecture } from '../services/api';

const ArchitectureGenerator = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    features: [],
    scalabilityNeeds: 'standard'
  });
  const [newFeature, setNewFeature] = useState('');
  const [architecture, setArchitecture] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.projectName.trim() || !formData.description.trim()) {
      toast.error('Please provide project name and description');
      return;
    }

    setLoading(true);
    try {
      const response = await generateArchitecture(formData);
      setArchitecture(response.data);
      toast.success('Architecture generated successfully!');
    } catch (error) {
      console.error('Error generating architecture:', error);
      toast.error(error.response?.data?.message || 'Failed to generate architecture');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      projectName: '',
      description: '',
      features: [],
      scalabilityNeeds: 'standard'
    });
    setNewFeature('');
    setArchitecture(null);
  };

  return (
    <div className="fade-in">
      {/* Header Section */}
      <div className="hero-section mb-5">
        <div className="d-flex align-items-center justify-content-center mb-4">
          <Layers size={48} className="text-primary me-3" />
          <h1 className="hero-title mb-0">Architecture Generator</h1>
        </div>
        <p className="hero-subtitle">
          Generate comprehensive system architectures tailored to your project specifications
        </p>
      </div>

      <div className="card">

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="projectName" className="form-label">
              Project Name *
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              className="form-control"
              placeholder="Enter your project name"
              value={formData.projectName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Project Description *
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control textarea"
              placeholder="Provide a detailed description of your project..."
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Features</label>
            <div className="d-flex gap-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Add a feature (e.g., User authentication, Real-time chat)..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddFeature(e)}
              />
              <button 
                type="button" 
                className="btn btn-success"
                onClick={handleAddFeature}
              >
                <Plus size={16} />
                Add
              </button>
            </div>
            {formData.features.length > 0 && (
              <div className="d-flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="badge"
                    style={{ 
                      background: 'var(--primary-gradient)', 
                      color: 'white', 
                      padding: '8px 12px', 
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '2px',
                        marginLeft: '4px',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="scalabilityNeeds" className="form-label">
              Scalability Requirements
            </label>
            <select
              id="scalabilityNeeds"
              name="scalabilityNeeds"
              className="form-control"
              value={formData.scalabilityNeeds}
              onChange={handleInputChange}
            >
              <option value="low">Low - Small user base, simple deployment</option>
              <option value="standard">Standard - Moderate growth expected</option>
              <option value="high">High - Large scale, high availability required</option>
              <option value="enterprise">Enterprise - Mission critical, global scale</option>
            </select>
          </div>

          <div className="d-flex gap-3">
            <button 
              type="submit" 
              className="btn btn-lg flex-fill"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Zap size={20} className="animate-spin" />
                  Generating Architecture...
                </>
              ) : (
                <>
                  <Layers size={20} />
                  Generate Architecture
                </>
              )}
            </button>
            <button 
              type="button" 
              className="btn btn-outline btn-lg"
              onClick={handleClear}
              disabled={loading}
            >
              <RefreshCw size={20} />
              Clear
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="card">
          <LoadingSpinner message="Generating architecture with AI..." />
        </div>
      )}

      {architecture && (
        <div className="card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Generated Architecture</h2>
            <small className="text-muted">
              Generated on {new Date(architecture.generatedAt).toLocaleString()}
            </small>
          </div>
          
          <div className="mb-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <h4 className="mb-2">Project Information</h4>
            <p><strong>Name:</strong> {architecture.projectInfo.name}</p>
            <p><strong>Description:</strong> {architecture.projectInfo.description}</p>
            {architecture.projectInfo.features && architecture.projectInfo.features.length > 0 && (
              <p><strong>Features:</strong> {architecture.projectInfo.features.join(', ')}</p>
            )}
            <p><strong>Scalability:</strong> {architecture.projectInfo.scalabilityNeeds}</p>
          </div>

          <div className="architecture-content">
            <MarkdownRenderer content={architecture.architecture} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureGenerator;