import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Plus, Calendar, Clock, Settings } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDesignSessions, createDesignSession, deleteDesignSession } from '../services/api';

const DesignSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    requirements: ''
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await getDesignSessions();
      setSessions(response.data.sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to fetch design sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Session name is required');
      return;
    }

    try {
      const response = await createDesignSession(formData);
      setSessions(prev => [response.data.session, ...prev]);
      setFormData({ name: '', description: '', requirements: '' });
      setShowCreateForm(false);
      toast.success('Design session created successfully!');
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error(error.response?.data?.message || 'Failed to create session');
    }
  };

  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to delete this session?')) {
      return;
    }

    try {
      await deleteDesignSession(sessionId);
      setSessions(prev => prev.filter(session => session.id !== sessionId));
      toast.success('Session deleted successfully');
    } catch (error) {
      console.error('Error deleting session:', error);
      toast.error('Failed to delete session');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <LoadingSpinner message="Loading design sessions..." />;
  }

  return (
    <div>
      <div className="card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="mb-2">Design Sessions</h1>
            <p className="text-muted mb-0">
              Manage and track your software design sessions
            </p>
          </div>
          <button 
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus size={16} />
            New Session
          </button>
        </div>

        {showCreateForm && (
          <div className="mb-4 p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
            <h3 className="mb-3">Create New Design Session</h3>
            <form onSubmit={handleCreateSession}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Session Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter session name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control textarea"
                  placeholder="Brief description of the session"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="requirements" className="form-label">
                  Initial Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  className="form-control textarea"
                  placeholder="Initial requirements or notes"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  Create Session
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {sessions.length === 0 ? (
        <div className="card text-center">
          <Settings size={48} className="text-muted mb-3 mx-auto" />
          <h3 className="mb-3">No Design Sessions Yet</h3>
          <p className="text-muted mb-4">
            Create your first design session to start organizing your software architecture work.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateForm(true)}
          >
            Create First Session
          </button>
        </div>
      ) : (
        <div className="grid grid-2">
          {sessions.map((session) => (
            <div key={session.id} className="card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h3 className="mb-0">{session.name}</h3>
                <span 
                  className={`badge ${session.status === 'active' ? 'success' : 'secondary'}`}
                  style={{
                    background: session.status === 'active' ? '#28a745' : '#6c757d',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                >
                  {session.status}
                </span>
              </div>

              {session.description && (
                <p className="text-muted mb-3">{session.description}</p>
              )}

              <div className="d-flex align-items-center gap-3 mb-3 text-muted">
                <div className="d-flex align-items-center gap-1">
                  <Calendar size={14} />
                  <small>{formatDate(session.createdAt)}</small>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <Clock size={14} />
                  <small>Modified {formatDate(session.lastModified)}</small>
                </div>
              </div>

              <div className="d-flex gap-2">
                <Link 
                  to={`/sessions/${session.id}`}
                  className="btn btn-primary"
                >
                  Open Session
                </Link>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDeleteSession(session.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignSessions;