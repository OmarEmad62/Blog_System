import React from 'react'
import {formatISO9075} from "date-fns";
import { Link } from 'react-router-dom';

interface PostProps {
  _id:string;
  title: string;
  summary: string;
  cover: string;
  createdAt: string;
}

const Post: React.FC<PostProps> = ({_id, title, summary, cover, createdAt }) => {
  return (
    <div className='post'>
    <div className="img">
    <Link to={`/post/${_id}`}>
    <img src={'http://localhost:4000/'+cover} alt=""/>
    </Link>
    </div>
    <div className="text">
    <Link to={`/post/${_id}`}>
    <h2>{title}</h2>
    </Link>
    <p className="info">
      <a className="author">✍Omar emad</a>
      <time>📅{formatISO9075(new Date(createdAt))}</time>
    </p>
    <p className="summary">{summary}</p>
    </div>
  </div>
      
  )
}

export default Post
