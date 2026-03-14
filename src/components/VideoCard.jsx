import React from 'react';
import { Link } from 'react-router-dom';

// Video Card
const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <Link to={`/video/${video._id}`}>
        <div className="thumbnail-container">
          <img 
            src={video.primaryThumbnail ? `http://localhost:5000${video.primaryThumbnail}` : 'https://via.placeholder.com/300x200?text=No+Thumbnail'} 
            alt={video.title} 
          />
        </div>
        <div className="video-info">
          <h3>{video.title}</h3>
          <p className="upload-date">
            {new Date(video.createdAt).toLocaleDateString()}
          </p>
          <div className="tags">
            {video.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
