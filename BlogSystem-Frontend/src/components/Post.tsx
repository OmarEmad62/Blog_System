
import React from 'react';
import { Link } from 'react-router-dom';

interface PostProps {
  _id: string;
  title: string;
  summary: string;
  cover: string;
  createdAt: string;
}

const Post: React.FC<PostProps> = ({ _id, title, summary, cover, createdAt }) => {
  return (
    <div className='post'>
      <div className="img">
        <Link to={`/post/${_id}`}>
          <img src={`${import.meta.env.VITE_API_URL}/${cover}`} alt={title} />
        </Link>
      </div>
      <div className="text">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">✍ Omar emad</a>
          <time>📅 {new Date(createdAt).toLocaleDateString()}</time>
        </p>
        <p className="summary">{summary}</p>
        <Link to={`/post/${_id}`} className="formButton" style={{ margin: '15px 0 0 0', padding: '8px 16px', fontSize: '0.9rem',color:"white" }}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Post;