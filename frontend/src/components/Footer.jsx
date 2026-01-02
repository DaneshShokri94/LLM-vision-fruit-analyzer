/**
 * Footer Component
 * Application footer with credits
 */

import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <span>💡 For best results, use clear, well-lit images of fruits</span>
          <span className="separator">•</span>
          <span>Supports: Apples, Oranges, Bananas, Grapes, Tomatoes, and more</span>
        </div>
        <div className="footer-credits">
          <span>Built by </span>
          <a 
            href="https://linkedin.com/in/danesh-shokri" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Danesh Shokri
          </a>
          <span className="separator">•</span>
          <a 
            href="https://github.com/DaneshShokri94/ai-fruit-analyzer" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
