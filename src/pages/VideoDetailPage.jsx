import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoDetailPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data.video);
        setThumbnails(res.data.thumbnails);
      } catch (err) {
        console.error('Error fetching video detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading details...</div>;
  if (!video) return <div>Video not found</div>;

  return (
    <div className="video-detail-page">
      <div className="video-player">
        <video controls src={`http://localhost:5000${video.videoUrl}`}>
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="details">
        <h2>{video.title}</h2>
        <p className="description">{video.description}</p>
        <div className="tags">
          {video.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
        <p className="date">Uploaded on: {new Date(video.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="thumbnail-section">
        <h3>All Thumbnails</h3>
        <div className="thumbnail-grid-display">
          {thumbnails.map((thumb) => (
            <div key={thumb._id} className={`thumb-wrapper ${thumb.thumbnailUrl === video.primaryThumbnail ? 'highlight' : ''}`}>
              <img src={`http://localhost:5000${thumb.thumbnailUrl}`} alt="Thumbnail" />
              {thumb.thumbnailUrl === video.primaryThumbnail && <span className="label">Primary</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
