import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          🔧 SE Workbench
        </Link>
        <ul className="navbar-nav">
          <li>
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/requirements" className={isActive('/requirements')}>
              Requirements Analysis
            </Link>
          </li>
          <li>
            <Link to="/architecture" className={isActive('/architecture')}>
              Architecture Generator
            </Link>
          </li>
          <li>
            <Link to="/sessions" className={isActive('/sessions')}>
              Design Sessions
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;