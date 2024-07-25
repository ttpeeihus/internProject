import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatViews, timeAgo } from '../function/content';
import '../css/content.css';
import { Btn } from './button';

export const Playlist = () => {
  const [playList, setPlayList] = useState([]);

  // Sử dụng useEffect để theo dõi sự thay đổi của playList từ backend
  useEffect(() => {
    const updatePlaylist = async () => {
      try {
        const response = await axios.get('http://localhost:3002/playlist/');
        const sortedPlaylist = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPlayList(sortedPlaylist);
      } catch (error) {
        console.error('Error updating playlist:', error);
      }
    };

    // Lắng nghe sự thay đổi của playlist từ backend mỗi 10 giây
    const interval = setInterval(() => {
      updatePlaylist();
    }, 500); // Thay đổi thời gian tùy thuộc vào tần suất bạn muốn

    return () => clearInterval(interval); // Cleanup để ngừng lắng nghe khi component unmount
  }, []); // [] đảm bảo useEffect này chỉ chạy một lần sau khi component mount

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
