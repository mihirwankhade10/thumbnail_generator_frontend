import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../components/VideoCard';

const GalleryPage = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (tag.trim()) params.tag = tag.trim();

      const res = await axios.get(`http://localhost:5000/api/videos`, { params });
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchVideos();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, tag]);

  return (
    <div className="gallery-page">
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search by title..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Filter by tag..." 
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button onClick={fetchVideos} className="refresh-btn">Refresh</button>
      </div>

      {loading ? (
        <div className="loading">Loading videos...</div>
      ) : (
        <div className="video-grid">
          {videos.length > 0 ? (
            videos.map(video => (
              <VideoCard key={video._id} video={video} />
            ))
          ) : (
            <p>No videos found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
