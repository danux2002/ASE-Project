import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, FileText, Settings, Users, Zap, Shield, Clock, Layers } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Brain size={32} />,
      title: 'AI-Powered Analysis',
      description: 'Leverage Gemini AI to analyze requirements and generate intelligent architectural recommendations with advanced machine learning.',
      link: '/requirements'
    },
    {
      icon: <FileText size={32} />,
      title: 'Architecture Generation',
      description: 'Generate comprehensive system architectures with technology stack recommendations and best practices.',
      link: '/architecture'
    },
    {
      icon: <Settings size={32} />,
      title: 'Design Sessions',
      description: 'Manage and track your design sessions with version control and collaboration features for teams.',
      link: '/sessions'
    },
    {
      icon: <Users size={32} />,
      title: 'Team Collaboration',
      description: 'Share insights and collaborate on architectural decisions with your development team in real-time.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Projects Analyzed' },
    { number: '500+', label: 'Happy Teams' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Software Engineering Workbench</h1>
        <p className="hero-subtitle">
          Automate software design decisions with AI-powered architecture generation, 
          requirements analysis, and intelligent recommendations for modern development teams.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/requirements" className="btn btn-lg">
            <Zap size={20} />
            Start Analysis
          </Link>
          <Link to="/architecture" className="btn btn-outline btn-lg">
            <Layers size={20} />
            Generate Architecture
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-2 mb-5">
        {features.map((feature, index) => (
          <div key={index} className="card-feature slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            {feature.link && (
              <Link to={feature.link} className="btn">
                Get Started
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
          Trusted by Development Teams Worldwide
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: '0.9' }}>
          Join thousands of teams who have accelerated their development process
        </p>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="steps-section">
        <div className="text-center mb-5">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
            How It Works
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Get from idea to architecture in three simple steps
          </p>
        </div>
        <div className="grid grid-3">
          <div className="step-item">
            <div className="step-number">1</div>
            <h4 className="step-title">Input Requirements</h4>
            <p className="step-description">
              Describe your project requirements, constraints, and objectives in natural language. 
              Our AI understands complex technical specifications.
            </p>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <h4 className="step-title">AI Analysis</h4>
            <p className="step-description">
              Our advanced AI analyzes your requirements and generates comprehensive architectural 
              recommendations with technology stack suggestions.
            </p>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <h4 className="step-title">Implement & Iterate</h4>
            <p className="step-description">
              Review suggestions, refine requirements, and iterate on the design with AI assistance. 
              Export your architecture for immediate implementation.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="card mb-5">
        <div className="text-center mb-4">
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px' }}>
            Why Choose SE Workbench?
          </h2>
        </div>
        <div className="grid grid-3">
          <div className="text-center">
            <div className="feature-icon" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
              <Zap size={24} />
            </div>
            <h4 className="mb-2">Lightning Fast</h4>
            <p className="text-secondary">
              Generate comprehensive architectures in seconds, not hours. 
              Accelerate your development timeline significantly.
            </p>
          </div>
          <div className="text-center">
            <div className="feature-icon" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
              <Shield size={24} />
            </div>
            <h4 className="mb-2">Enterprise Security</h4>
            <p className="text-secondary">
              Bank-level security with encrypted data transmission and storage. 
              Your intellectual property is always protected.
            </p>
          </div>
          <div className="text-center">
            <div className="feature-icon" style={{ width: '60px', height: '60px', fontSize: '24px' }}>
              <Clock size={24} />
            </div>
            <h4 className="mb-2">Always Updated</h4>
            <p className="text-secondary">
              Stay current with the latest technology trends and best practices. 
              Our AI is continuously learning and improving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;