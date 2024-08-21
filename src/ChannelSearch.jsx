import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// Import logo asset
import logo from './assets/nexus-logo.png';

const ChannelSearch = () => {
  const [channelName, setChannelName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [videos, setVideos] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/youtube/channel/${channelName}/keyword/${keyword}`);
      setVideos(response.data.videos);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="nexus-container">
      <header className="nexus-header">
        <img src={logo} alt="YT Nexus" className="nexus-logo" />
        <h1 className="nexus-title">YT Nexus</h1>
      </header>
      
      <main className="nexus-content">
        <div className="nexus-input-group">
          <input
            type="text"
            placeholder="Enter Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="nexus-input"
          />
          <input
            type="text"
            placeholder="Enter Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="nexus-input"
          />
          <button className="nexus-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        
        <section className="nexus-video-list">
          {videos.length > 0 && (
            <>
              <h2 className="nexus-subtitle">Results:</h2>
              <div className="nexus-video-grid">
                {videos.map((video) => (
                  <div key={video.video_id} className="nexus-video-item">
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${video.video_id}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="nexus-video-details">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.video_id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="nexus-link"
                      >
                        Video ID: {video.video_id} (Count: {video.count})
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default ChannelSearch;
