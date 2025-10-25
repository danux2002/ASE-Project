import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Brain, FileText, Save } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { 
  getDesignSession, 
  updateDesignSession, 
  addAnalysisToSession, 
  addArchitectureToSession,
  analyzeRequirements,
  generateArchitecture
} from '../services/api';

const SessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchSession();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSession = async () => {
    try {
      const response = await getDesignSession(id);
      setSession(response.data.session);
      setEditData({
        name: response.data.session.name,
        description: response.data.session.description,
        requirements: response.data.session.requirements
      });
    } catch (error) {
      console.error('Error fetching session:', error);
      toast.error('Failed to fetch session details');
      navigate('/sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await updateDesignSession(id, editData);
      setSession(response.data.session);
      setEditMode(false);
      toast.success('Session updated successfully');
    } catch (error) {
      console.error('Error updating session:', error);
      toast.error('Failed to update session');
    }
  };

  const handleAnalyzeRequirements = async () => {
    if (!session.requirements) {
      toast.error('No requirements to analyze');
      return;
    }

    setAiLoading(true);
    try {
      const analysisResponse = await analyzeRequirements({
        requirements: session.requirements,
        projectType: 'general',
        constraints: ''
      });

      await addAnalysisToSession(id, {
        analysis: analysisResponse.data.analysis,
        type: 'requirements'
      });

      await fetchSession();
      toast.success('Requirements analysis added to session');
    } catch (error) {
      console.error('Error analyzing requirements:', error);
      toast.error('Failed to analyze requirements');
    } finally {
      setAiLoading(false);
    }
  };

  const handleGenerateArchitecture = async () => {
    if (!session.name || !session.description) {
      toast.error('Session needs name and description to generate architecture');
      return;
    }

    setAiLoading(true);
    try {
      const archResponse = await generateArchitecture({
        projectName: session.name,
        description: session.description,
        features: [],
        scalabilityNeeds: 'standard'
      });

      await addArchitectureToSession(id, {
        architecture: archResponse.data.architecture,
        name: `Architecture for ${session.name}`
      });

      await fetchSession();
      toast.success('Architecture generated and added to session');
    } catch (error) {
      console.error('Error generating architecture:', error);
      toast.error('Failed to generate architecture');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading session details..." />;
  }

  if (!session) {
    return (
      <div className="card text-center">
        <h2>Session Not Found</h2>
        <p>The requested session could not be found.</p>
        <button className="btn btn-primary" onClick={() => navigate('/sessions')}>
          Back to Sessions
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="card">
        <div className="d-flex align-items-center gap-3 mb-4">
          <button 
            className="btn btn-secondary d-flex align-items-center gap-2"
            onClick={() => navigate('/sessions')}
          >
            <ArrowLeft size={16} />
            Back to Sessions
          </button>
          <h1 className="mb-0">{session.name}</h1>
          <span 
            className="badge"
            style={{
              background: session.status === 'active' ? '#28a745' : '#6c757d',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px'
            }}
          >
            {session.status}
          </span>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
          {['overview', 'analyses', 'architectures'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#007bff' : 'transparent',
                color: activeTab === tab ? 'white' : '#333',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '4px 4px 0 0',
                marginRight: '5px'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* AI Actions */}
        <div className="d-flex gap-2 mb-4">
          <button 
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={handleAnalyzeRequirements}
            disabled={aiLoading || !session.requirements}
          >
            <Brain size={16} />
            {aiLoading ? 'Analyzing...' : 'Analyze Requirements'}
          </button>
          <button 
            className="btn btn-success d-flex align-items-center gap-2"
            onClick={handleGenerateArchitecture}
            disabled={aiLoading}
          >
            <FileText size={16} />
            {aiLoading ? 'Generating...' : 'Generate Architecture'}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="card">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Session Overview</h2>
            <button 
              className="btn btn-secondary d-flex align-items-center gap-2"
              onClick={() => setEditMode(!editMode)}
            >
              <Save size={16} />
              {editMode ? 'Cancel Edit' : 'Edit Session'}
            </button>
          </div>

          {editMode ? (
            <div>
              <div className="form-group">
                <label className="form-label">Session Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control textarea"
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Requirements</label>
                <textarea
                  className="form-control textarea"
                  value={editData.requirements}
                  onChange={(e) => setEditData({...editData, requirements: e.target.value})}
                  rows={6}
                />
              </div>
              <button className="btn btn-primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <h4>Description</h4>
                <p>{session.description || 'No description provided'}</p>
              </div>
              <div className="mb-4">
                <h4>Requirements</h4>
                <p>{session.requirements || 'No requirements specified'}</p>
              </div>
              <div className="grid grid-3">
                <div className="text-center">
                  <h5>{session.analyses?.length || 0}</h5>
                  <p className="text-muted">Analyses</p>
                </div>
                <div className="text-center">
                  <h5>{session.architectures?.length || 0}</h5>
                  <p className="text-muted">Architectures</p>
                </div>
                <div className="text-center">
                  <h5>{new Date(session.createdAt).toLocaleDateString()}</h5>
                  <p className="text-muted">Created</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'analyses' && (
        <div>
          {session.analyses && session.analyses.length > 0 ? (
            session.analyses.map((analysis) => (
              <div key={analysis.id} className="card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3>Analysis - {analysis.type}</h3>
                  <small className="text-muted">
                    {new Date(analysis.createdAt).toLocaleString()}
                  </small>
                </div>
                <MarkdownRenderer content={analysis.content} />
              </div>
            ))
          ) : (
            <div className="card text-center">
              <Brain size={48} className="text-muted mb-3 mx-auto" />
              <h3>No Analyses Yet</h3>
              <p className="text-muted mb-4">
                Generate AI-powered analyses of your requirements to get started.
              </p>
              <button 
                className="btn btn-primary"
                onClick={handleAnalyzeRequirements}
                disabled={!session.requirements}
              >
                Analyze Requirements
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'architectures' && (
        <div>
          {session.architectures && session.architectures.length > 0 ? (
            session.architectures.map((architecture) => (
              <div key={architecture.id} className="card">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3>{architecture.name}</h3>
                  <small className="text-muted">
                    {new Date(architecture.createdAt).toLocaleString()}
                  </small>
                </div>
                <MarkdownRenderer content={architecture.content} />
              </div>
            ))
          ) : (
            <div className="card text-center">
              <FileText size={48} className="text-muted mb-3 mx-auto" />
              <h3>No Architectures Yet</h3>
              <p className="text-muted mb-4">
                Generate comprehensive system architectures for your project.
              </p>
              <button 
                className="btn btn-success"
                onClick={handleGenerateArchitecture}
              >
                Generate Architecture
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionDetail;