import React, { useEffect, useState } from 'react';
import Post from './Post';

interface PostType {
  _id: string;
  title: string;
  summary: string;
  cover: string;
  createdAt: string;
}

const IndexPage: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
      });
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} key={post._id} />
      ))}
      
    </>
  );
};

export default IndexPage;
