
import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useNavigate } from 'react-router-dom';

interface PostType {
  _id: string;
  title: string;
  summary: string;
  cover: string;
  createdAt: string;
  order: number;
}

const Reorder: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/post`)
      .then(response => response.json())
      .then(posts => {
        setPosts(posts.sort((a: PostType, b: PostType) => a.order - b.order));
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      });
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = posts.findIndex(post => post._id === active.id);
      const newIndex = posts.findIndex(post => post._id === over.id);

      const newPosts = arrayMove(posts, oldIndex, newIndex);
      setPosts(newPosts);
      setSaved(false);
    }
  };

  const updateOrderOnServer = async () => {
    setSaved(true);
    const formattedPosts = posts.map((post, index) => ({
      _id: post._id,
      order: index,
    }));

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/post/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reorderedPosts: formattedPosts }),
      });
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error("Failed to update post order:", error);
      setSaved(false);
      alert("Failed to save the new order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'hsl(var(--primary))' }}>
        Reorder Your Posts
      </h1>
      <p className="text-center mb-8 text-gray-600">
        Drag and drop posts to reorder them. Click "Save Order" when finished.
      </p>
      
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={posts.map(post => post._id)}
          strategy={verticalListSortingStrategy}
        >
          {posts.map(post => (
            <SortablePost key={post._id} post={post} />
          ))}
        </SortableContext>
      </DndContext>
      
      <button
        className="formButton"
        onClick={updateOrderOnServer}
        disabled={saved}
      >
        {saved ? "Order Saved!" : "Save Order"}
      </button>
    </div>
  );
};

const SortablePost: React.FC<{ post: PostType }> = ({ post }) => {
  const { _id, title, summary, cover, createdAt } = post;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: _id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="post sortable-post"
    >
      <div className="img">
        <img src={`${import.meta.env.VITE_API_URL}/${cover}`} alt={title} />
      </div>
      <div className="text">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">✍ Omar emad</a>
          <time>📅 {new Date(createdAt).toLocaleDateString()}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Reorder;