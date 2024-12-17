import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


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

  useEffect(() => {
    fetch('http://localhost:4000/post')
      .then(response => response.json())
      .then(posts => {
      
        setPosts(posts.sort((a: PostType, b: PostType) => a.order - b.order));
      });
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = posts.findIndex(post => post._id === active.id);
      const newIndex = posts.findIndex(post => post._id === over.id);

  
      const newPosts = arrayMove(posts, oldIndex, newIndex);
      setPosts(newPosts);

      
      updateOrderOnServer(newPosts);
    }
  };

  const updateOrderOnServer = async (updatedPosts: PostType[]) => {
    const formattedPosts = updatedPosts.map((post, index) => ({
      _id: post._id,
      order: index, 
    }));

    await fetch('http://localhost:4000/post/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reorderedPosts: formattedPosts }),
    });
  };

  return (
    <>
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
        onClick={() => window.location.href = '/'}
      >
        Reorder
      </button>
    </>
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
      className="post"
    >
      <div className="img">
        <img src={'http://localhost:4000/' + cover} alt={title} />
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
