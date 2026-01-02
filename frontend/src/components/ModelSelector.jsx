/**
 * ModelSelector Component
 * Select AI model for analysis
 */

import React from 'react';

function ModelSelector({ models, selectedModel, onSelectModel }) {
  // Custom icon components for each model
  const ModelIcon = ({ model }) => {
    const iconStyles = {
      claude: {
        background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
        boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
      },
      gpt4: {
        background: 'linear-gradient(135deg, #10A37F 0%, #34D399 100%)',
        boxShadow: '0 4px 15px rgba(16, 163, 127, 0.4)'
      },
      gemini: {
        background: 'linear-gradient(135deg, #4285F4 0%, #60A5FA 100%)',
        boxShadow: '0 4px 15px rgba(66, 133, 244, 0.4)'
      },
      deepseek: {
        background: 'linear-gradient(135deg, #FF6B35 0%, #F97316 100%)',
        boxShadow: '0 4px 15px rgba(255, 107, 53, 0.4)'
      },
      grok: {
        background: 'linear-gradient(135deg, #1DA1F2 0%, #0EA5E9 100%)',
        boxShadow: '0 4px 15px rgba(29, 161, 242, 0.4)'
      }
    };

    const style = iconStyles[model.id] || iconStyles.claude;

    return (
      <div 
        className="model-icon-circle"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          ...style
        }}
      >
        {model.id === 'claude' && '✦'}
        {model.id === 'gpt4' && '◈'}
        {model.id === 'gemini' && '◆'}
        {model.id === 'deepseek' && '◉'}
        {model.id === 'grok' && '✕'}
      </div>
    );
  };

  return (
    <div className="model-selector">
      <label className="selector-label">
        <span>🤖</span> Select AI Model
      </label>
      <div className="model-grid">
        {models.map((model) => (
          <button
            key={model.id}
            className={`model-card ${selectedModel === model.id ? 'selected' : ''}`}
            onClick={() => onSelectModel(model.id)}
            style={{
              '--model-color': model.color,
            }}
          >
            <ModelIcon model={model} />
            <div className="model-info">
              <span className="model-name">{model.name}</span>
              <span className="model-provider">{model.provider}</span>
            </div>
            {selectedModel === model.id && (
              <span className="selected-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ModelSelector;
