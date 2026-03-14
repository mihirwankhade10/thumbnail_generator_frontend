import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import UploadPage from './pages/UploadPage';
import VideoDetailPage from './pages/VideoDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Video Gallery</h1>
          <nav>
            <a href="/">Gallery</a>
            <a href="/upload">Upload</a>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<GalleryPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/video/:id" element={<VideoDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
