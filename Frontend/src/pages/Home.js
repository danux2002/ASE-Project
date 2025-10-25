import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, FileText, Settings, Users } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Brain size={48} />,
      title: 'AI-Powered Analysis',
      description: 'Leverage Gemini AI to analyze requirements and generate intelligent architectural recommendations.',
      link: '/requirements'
    },
    {
      icon: <FileText size={48} />,
      title: 'Architecture Generation',
      description: 'Generate comprehensive system architectures with technology stack recommendations.',
      link: '/architecture'
    },
    {
      icon: <Settings size={48} />,
      title: 'Design Sessions',
      description: 'Manage and track your design sessions with version control and collaboration features.',
      link: '/sessions'
    },
    {
      icon: <Users size={48} />,
      title: 'Team Collaboration',
      description: 'Share insights and collaborate on architectural decisions with your development team.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="card text-center mb-5">
        <h1 className="mb-3">Software Engineering Workbench</h1>
        <p className="text-muted mb-4">
          Automate software design decisions with AI-powered architecture generation and requirements analysis
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/requirements" className="btn btn-primary">
            Start Requirements Analysis
          </Link>
          <Link to="/architecture" className="btn btn-secondary">
            Generate Architecture
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-2 mb-5">
        {features.map((feature, index) => (
          <div key={index} className="card">
            <div className="text-center mb-3" style={{ color: '#007bff' }}>
              {feature.icon}
            </div>
            <h3 className="text-center mb-3">{feature.title}</h3>
            <p className="text-muted text-center mb-3">{feature.description}</p>
            {feature.link && (
              <div className="text-center">
                <Link to={feature.link} className="btn btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="card">
        <h2 className="mb-4">How It Works</h2>
        <div className="grid grid-3">
          <div className="text-center">
            <div className="mb-3" style={{ color: '#28a745', fontSize: '36px' }}>1</div>
            <h4 className="mb-2">Input Requirements</h4>
            <p className="text-muted">
              Describe your project requirements, constraints, and objectives in natural language.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3" style={{ color: '#ffc107', fontSize: '36px' }}>2</div>
            <h4 className="mb-2">AI Analysis</h4>
            <p className="text-muted">
              Our AI analyzes your requirements and generates comprehensive architectural recommendations.
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3" style={{ color: '#dc3545', fontSize: '36px' }}>3</div>
            <h4 className="mb-2">Implement & Iterate</h4>
            <p className="text-muted">
              Review suggestions, refine requirements, and iterate on the design with AI assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;