import React, { useState } from 'react';
import axios from 'axios';
import ThumbnailGrid from '../components/ThumbnailGrid';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [videoId, setVideoId] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbId, setSelectedThumbId] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a video file');

    const formData = new FormData();
    formData.append('videoFile', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);

    try {
      setLoading(true);
      setStatus('Uploading video...');
      const res = await axios.post('http://localhost:5000/api/videos', formData);
      const vidId = res.data.videoId;
      setVideoId(vidId);
      
      setStatus('Generating thumbnails...');
      const thumbRes = await axios.post(`http://localhost:5000/api/videos/${vidId}/thumbnails/generate`);
      setThumbnails(thumbRes.data);
      setStatus('Success! Please select a primary thumbnail.');
    } catch (err) {
      console.error(err);
      setStatus('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectThumbnail = async (thumbId) => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/api/videos/${videoId}/thumbnails/select`, {
        thumbnailId: thumbId
      });
      setSelectedThumbId(thumbId);
      setStatus('Primary thumbnail selected! You can now view it in the gallery.');
    } catch (err) {
      console.error(err);
      setStatus('Selection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. react, node, tutorial" />
        </div>
        <div className="form-group">
          <label>Video File (.mp4 recommended)</label>
          <input type="file" accept="video/mp4,video/x-m4v,video/*" onChange={(e) => setFile(e.target.files[0])} required />
          <p className="hint">Note: Browsers primarily support .mp4 files. Other formats may not play.</p>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Upload & Generate Thumbnails'}
        </button>
      </form>

      {status && <p className="status-message">{status}</p>}

      <ThumbnailGrid 
        thumbnails={thumbnails} 
        onSelect={handleSelectThumbnail} 
        selectedId={selectedThumbId}
        loading={loading && status.includes('Generating')}
      />
    </div>
  );
};

export default UploadPage;
