import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Home, FileText, Layers, FolderOpen } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/requirements', label: 'Requirements', icon: <FileText size={18} /> },
    { path: '/architecture', label: 'Architecture', icon: <Layers size={18} /> },
    { path: '/sessions', label: 'Sessions', icon: <FolderOpen size={18} /> },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <Cpu size={32} />
            SE Workbench
          </Link>
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={isActive(item.path)}>
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;