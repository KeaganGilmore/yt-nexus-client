import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './assets/nexus-logo.png';
import lxLogo from './assets/logo.svg';

const ChannelSearch = () => {
  const [searchMode, setSearchMode] = useState('channel-keyword');
  const [channelName, setChannelName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [videoWordCounts, setVideoWordCounts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message

  const handleSearch = async () => {
    try {
      let response;
      setErrorMessage(''); // Reset error message before each search
      switch (searchMode) {
        case 'channel-keyword':
          response = await axios.get(`https://lxlibrary.online/yt-nexus/yt-nexus/channel/${channelName}/keyword/${keyword}`);
          break;
        case 'search':
          response = await axios.get(`https://lxlibrary.online/yt-nexus/yt-nexus/search?keyword=${keyword}`);
          break;
        case 'multi-channel':
          response = await axios.post(`https://lxlibrary.online/yt-nexus/yt-nexus/multi-channel-search?keyword=${keyword}`, [channelName]);
          break;
        case 'multi-video':
          response = await axios.post(`https://lxlibrary.online/yt-nexus/yt-nexus/multi-video-search?keyword=${keyword}`, []);
          break;
        default:
          break;
      }

      const videos = response.data.videos;

      if (videos === null || videos.length === 0) {
        setErrorMessage('Error: The parameters of your search yielded no findings within the content of the YT-Nexus DB.');
        setVideoWordCounts([]); // Clear any previous video data
      } else {
        setVideoWordCounts(videos);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('The parameters of your search yielded no findings within the content of the YT-Nexus database.');
    }
  };

  return (
    <div>
      <div className="nexus-container">
        <header className="nexus-header">
          <img src={logo} alt="YT Nexus" className="nexus-logo" />
          <h1 className="nexus-title">YT Nexus</h1>
        </header>
        
        <main className="nexus-content">
          <div className="nexus-input-group">
            <div className="nexus-search-mode">
              <label htmlFor="search-mode">Search Mode:</label>
              <select
                id="search-mode"
                value={searchMode}
                onChange={(e) => setSearchMode(e.target.value)}
                className="nexus-input"
              >
                <option value="channel-keyword">Channel Keyword Search</option>
              </select>
            </div>

            {searchMode === 'channel-keyword' && (
              <>
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
              </>
            )}

            {searchMode === 'search' && (
              <input
                type="text"
                placeholder="Enter Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="nexus-input"
              />
            )}

            {searchMode === 'multi-channel' && (
              <input
                type="text"
                placeholder="Enter Comma-Separated Channel Names"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="nexus-input"
              />
            )}

            {searchMode === 'multi-video' && (
              <input
                type="text"
                placeholder="Enter Comma-Separated Video IDs"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="nexus-input"
              />
            )}

            <button className="nexus-button" onClick={handleSearch}>
              Search
            </button>
          </div>

          {errorMessage && (
            <p className="nexus-error-message">{errorMessage}</p>
          )}

          {videoWordCounts.length > 0 && (
            <section className="nexus-video-list">
              <h2 className="nexus-subtitle">Results:</h2>
              <div className="nexus-video-grid">
                {videoWordCounts.map((video) => (
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
            </section>
          )}
        </main>
      </div>

      <div className="info-container">
        <div className="info-bubble">i</div>
      </div>
      
      <div class="icon-section">
        <span class="donation-text">Donations Appreciated</span>
        <a href="https://www.paypal.com/paypalme/KeaganGilmore15?v=1&utm_source=unp&utm_medium=email&utm_campaign=RT000269&utm_unptid=c98f4490-8868-11ee-9291-3cecef432c93&ppid=RT000269&cnac=ZA&rsta=en_US%28en-ZA%29&cust=2C5VJWAXPHY9E&unptid=c98f4490-8868-11ee-9291-3cecef432c93&calc=f751073bfeade&unp_tpcid=ppme-social-user-profile-created&page=main%3Aemail%3ART000269&pgrp=main%3Aemail&e=cl&mchn=em&s=ci&mail=sys&appVersion=1.216.0&xt=104038%2C127632" target="_blank" title="Donate via PayPal">
          <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" class="paypal-logo" />
        </a>
        <a href="https://github.com/KeaganGilmore/YT-Nexus_API" className="github-icon" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
      </div>
      
      <a href="https://website.lxlibrary.online/" className="powered-by-lxlibrary" target="_blank">
        <div className="text">Powered by LXLibrary</div>
        <img src={lxLogo} alt="LXLibrary Logo" className="lx-logo" />
      </a>
      
      <div className="contact-icon-section">
        <a href="mailto:keagangilmore@gmail.com" title="Email" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-envelope fa-2x"></i>
        </a>
        <a href="https://discord.com/users/keagan2980" title="Discord" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-discord fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

export default ChannelSearch;
