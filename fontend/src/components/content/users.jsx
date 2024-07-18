import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatViews, timeAgo } from '../function/content';
import '../css/content.css'; // Đảm bảo rằng tệp content.css nằm cùng cấp với tệp Playlist.js
import { Btn } from './button';

export const Playlist = () => {
  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get('http://localhost:3001/playlist/');
        // Assuming response.data is an array of playlist items with a 'date' field
        const sortedPlaylist = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPlayList(sortedPlaylist);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchPlaylist();
  }, []);


  const renderVideo = (list, index) => (
    <div key={index} className="video-wrapper">
      <iframe
        src={list.src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="description">
        <img src={`images/${list.avtUser}`} alt="Avatar" />
        <div className="des">
          <div className="name">{list.name}</div>
          <div className="author">{list.author}</div>
          <div className="late">
            <div className="watched">{formatViews(list.watched)} lượt xem</div>
            <div className="date">• {timeAgo(list.date)}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="content">
        <Btn />
      <div className="video">
        {playList.map((list, index) => renderVideo(list, index))}
      </div>
    </div>
  );
};