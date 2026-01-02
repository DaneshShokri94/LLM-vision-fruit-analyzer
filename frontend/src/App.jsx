/**
 * 🍎 AI Fruit Disease Analyzer
 * Multi-LLM Powered Agricultural Diagnosis Platform
 */

import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ModelSelector from './components/ModelSelector';
import ImageUploader from './components/ImageUploader';
import ResultsPanel from './components/ResultsPanel';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  // State Management
  const [selectedModel, setSelectedModel] = useState('claude');
  const [apiKey, setApiKey] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);

  // Available AI Models
  const models = [
    { id: 'claude', name: 'Claude', provider: 'Anthropic', icon: '🟣', color: '#7C3AED' },
    { id: 'gpt4', name: 'GPT-4 Vision', provider: 'OpenAI', icon: '🟢', color: '#10A37F' },
    { id: 'gemini', name: 'Gemini Pro', provider: 'Google', icon: '🔵', color: '#4285F4' },
    { id: 'deepseek', name: 'DeepSeek', provider: 'DeepSeek', icon: '🟠', color: '#FF6B35' },
    { id: 'grok', name: 'Grok', provider: 'xAI', icon: '⚫', color: '#1DA1F2' },
  ];

  // Handle Image Selection
  const handleImageSelect = useCallback((file) => {
    setImage(file);
    setResults(null);
    setError(null);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle Analysis
  const handleAnalyze = async () => {
    if (!image || !apiKey) {
      setError('Please select an image and enter your API key');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('model', selectedModel);
      formData.append('api_key', apiKey);

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Analysis failed');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Clear All
  const handleClear = () => {
    setImage(null);
    setImagePreview(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">
          {/* Configuration Panel */}
          <section className="config-section">
            <div className="section-header">
              <h2>⚙️ Configuration</h2>
              <p>Select your AI model and enter API credentials</p>
            </div>
            
            <ModelSelector
              models={models}
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
            />
            
            <div className="api-key-input">
              <label htmlFor="apiKey">
                🔑 API Key
                <span className="provider-hint">
                  ({models.find(m => m.id === selectedModel)?.provider})
                </span>
              </label>
              <div className="input-wrapper">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key..."
                  className="api-input"
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? '🙈' : '👁️'}
                </button>
              </div>
              <p className="api-hint">
                Your API key is never stored and only used for this session
              </p>
            </div>
          </section>

          {/* Main Analysis Area */}
          <div className="analysis-grid">
            {/* Upload Panel */}
            <section className="upload-section">
              <div className="section-header">
                <h2>📷 Upload Image</h2>
                <p>Select a fruit image for disease analysis</p>
              </div>
              
              <ImageUploader
                onImageSelect={handleImageSelect}
                imagePreview={imagePreview}
                onClear={handleClear}
              />
              
              <button
                className={`analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
                onClick={handleAnalyze}
                disabled={!image || !apiKey || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>🔬 Analyze for Disease</>
                )}
              </button>
            </section>

            {/* Results Panel */}
            <section className="results-section">
              <div className="section-header">
                <h2>📋 Analysis Results</h2>
                <p>AI-powered disease diagnosis</p>
              </div>
              
              <ResultsPanel
                results={results}
                error={error}
                isAnalyzing={isAnalyzing}
                selectedModel={models.find(m => m.id === selectedModel)}
              />
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
