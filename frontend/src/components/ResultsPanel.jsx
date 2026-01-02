/**
 * ResultsPanel Component
 * Display analysis results
 */

import React from 'react';

function ResultsPanel({ results, error, isAnalyzing, selectedModel }) {
  // Waiting state
  if (!results && !error && !isAnalyzing) {
    return (
      <div className="results-panel waiting">
        <div className="waiting-content">
          <div className="waiting-icon">⏳</div>
          <h3>Awaiting Analysis</h3>
          <p>Upload an image and click "Analyze" to begin</p>
          <ul className="features-list">
            <li>🍎 Fruit identification</li>
            <li>🔬 Disease detection</li>
            <li>📊 Severity assessment</li>
            <li>💊 Treatment recommendations</li>
          </ul>
        </div>
      </div>
    );
  }

  // Loading state
  if (isAnalyzing) {
    return (
      <div className="results-panel analyzing">
        <div className="analyzing-content">
          <div className="analyzing-spinner">
            <div className="spinner-ring"></div>
            <span className="model-icon">{selectedModel?.icon}</span>
          </div>
          <h3>Analyzing with {selectedModel?.name}...</h3>
          <p>Processing your image through AI vision model</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="results-panel error">
        <div className="error-content">
          <div className="error-icon">❌</div>
          <h3>Analysis Failed</h3>
          <p className="error-message">{error}</p>
          <div className="error-hints">
            <h4>Troubleshooting:</h4>
            <ul>
              <li>Check your API key is correct</li>
              <li>Ensure you have API credits available</li>
              <li>Verify the image is a valid fruit photo</li>
              <li>Try a different AI model</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Results state
  return (
    <div className="results-panel success">
      {/* Status Badge */}
      <div className={`status-badge ${results.is_healthy ? 'healthy' : 'infected'}`}>
        {results.is_healthy ? '✅ HEALTHY' : '⚠️ DISEASE DETECTED'}
      </div>

      {/* Results Content */}
      <div className="results-content">
        {/* Fruit Info */}
        <div className="result-section">
          <h4>🍎 Fruit Identification</h4>
          <div className="result-grid">
            <div className="result-item">
              <span className="label">Type</span>
              <span className="value">{results.fruit_type || 'Unknown'}</span>
            </div>
            <div className="result-item">
              <span className="label">Variety</span>
              <span className="value">{results.variety || 'N/A'}</span>
            </div>
            <div className="result-item">
              <span className="label">Ripeness</span>
              <span className="value">{results.ripeness || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Disease Info (if detected) */}
        {!results.is_healthy && (
          <div className="result-section disease-section">
            <h4>🦠 Disease Analysis</h4>
            <div className="result-grid">
              <div className="result-item">
                <span className="label">Disease</span>
                <span className="value disease-name">{results.disease_name || 'Unknown'}</span>
              </div>
              <div className="result-item">
                <span className="label">Type</span>
                <span className="value">{results.disease_type || 'N/A'}</span>
              </div>
              <div className="result-item">
                <span className="label">Severity</span>
                <span className={`value severity-${results.severity?.toLowerCase()}`}>
                  {results.severity || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Symptoms */}
        {results.symptoms && results.symptoms.length > 0 && (
          <div className="result-section">
            <h4>📝 Symptoms Observed</h4>
            <ul className="symptoms-list">
              {results.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {results.recommendations && results.recommendations.length > 0 && (
          <div className="result-section">
            <h4>💊 Recommendations</h4>
            <ul className="recommendations-list">
              {results.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Raw Analysis */}
        {results.raw_analysis && (
          <details className="raw-analysis">
            <summary>📄 View Full Analysis</summary>
            <pre>{results.raw_analysis}</pre>
          </details>
        )}

        {/* Model Attribution */}
        <div className="model-attribution">
          <span>Analyzed by {selectedModel?.icon} {selectedModel?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default ResultsPanel;
