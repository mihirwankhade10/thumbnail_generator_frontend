import React from 'react';

// Thumbnail Grid Component
const ThumbnailGrid = ({ thumbnails, onSelect, selectedId, loading }) => {
  if (loading) return <div className="loading">Generating thumbnails...</div>;
  if (!thumbnails || thumbnails.length === 0) return null;

  return (
    <div className="thumbnail-grid">
      <h3>Select Primary Thumbnail</h3>
      <div className="grid">
        {thumbnails.map((thumb) => (
          <div 
            key={thumb.id} 
            className={`thumbnail-item ${selectedId === thumb.id ? 'selected' : ''}`}
            onClick={() => onSelect(thumb.id)}
          >
            <img src={`http://localhost:5000${thumb.url}`} alt="Thumbnail candidate" />
            {selectedId === thumb.id && <div className="selected-badge">Primary</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailGrid;
