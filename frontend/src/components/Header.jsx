/**
 * Header Component
 * Application branding and navigation
 */

import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🌿</span>
          <div className="logo-text">
            <h1>AI Fruit Analyzer</h1>
            <p>Multi-LLM Disease Detection Platform</p>
          </div>
        </div>
        
        <nav className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#models" className="nav-link">Models</a>
          <a href="https://github.com/DaneshShokri94/ai-fruit-analyzer" 
             className="nav-link github-link" 
             target="_blank" 
             rel="noopener noreferrer">
            ⭐ GitHub
          </a>
        </nav>
        
        <div className="header-badge">
          <span className="badge-text">⚡ Powered by AI</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
