import axios from 'axios';
import '../css/content.css';
import { useEffect, useState } from 'react';
import { formatViews, timeAgo } from '../function/content';
import { delVideo } from '../function/api';
import { Btn } from './button';
import { EditVideo } from '../form/editVideo';

export const Playlist = () => {
  const [playList, setPlayList] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // State để điều khiển hiển thị EditVideo
  const [idVideo, setIdVideo] = useState(0);

  const editbtn = (id) => {
    setIdVideo(id);
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const updatePlaylist = async () => {
      try {
        const token = localStorage.getItem('token');

        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        let response = await axios.get('http://localhost:3002/playlist/', options);

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
        <img src={`http://localhost:3000/images/${list.avtUser}`} alt="Avatar" />
        <div className="des">
          <div className="name">{list.name}</div>
          <div className="author">{list.author}</div>
          <div className="late">
            <div className="watched">{formatViews(list.watched)} lượt xem</div>
            <div className="date">• {timeAgo(list.date)}</div>
          </div>
        </div>
        <div className="change" onClick={() => editbtn(list.id)}>Sửa</div>
        <div className="delete" onClick={() => delVideo(list.id)}>Xóa</div>
      </div>
    </div>
  );

  return (
    <div className="content">
      <Btn />
      <div className="video">
        {playList.map((list, index) => renderVideo(list, index))}
      </div>
      <div className={`edit-video ${isVisible ? 'visible' : ''}`}>
        <div id="overlay" onClick={() => editbtn(0)}></div>
        <EditVideo idVideo={idVideo}/>
      </div>
    </div>
  );
};
