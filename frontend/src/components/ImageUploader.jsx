/**
 * ImageUploader Component
 * Drag & drop or click to upload images
 */

import React, { useRef, useState } from 'react';

function ImageUploader({ onImageSelect, imagePreview, onClear }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  const handleClick = () => {
    if (!imagePreview) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`image-uploader ${isDragging ? 'dragging' : ''} ${imagePreview ? 'has-image' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        hidden
      />
      
      {imagePreview ? (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" />
          <div className="image-actions">
            <button
              className="action-btn change-btn"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              📁 Change
            </button>
            <button
              className="action-btn clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="upload-placeholder">
          <div className="upload-icon">🖼️</div>
          <h3>Drop your image here</h3>
          <p>or click to browse</p>
          <span className="supported-formats">
            Supports: JPG, PNG, WEBP, GIF
          </span>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
