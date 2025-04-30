
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/post`)
      .then(response => response.json())
      .then(posts => {
        setPosts(posts);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse text-xl text-primary">Loading posts...</div>
      </div>
    );
  }

  return (
    <>
      {posts.length > 0 ? (
        posts.map(post => <Post {...post} key={post._id} />)
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-3">No posts yet</h2>
          <p>Start creating your first blog post!</p>
        </div>
      )}
    </>
  );
};

export default IndexPage;