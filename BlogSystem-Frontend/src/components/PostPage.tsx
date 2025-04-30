
import { formatISO9075 } from "date-fns";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

interface PostInfo {
  _id: string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  createdAt: string;
}

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
          setLoading(false);
        });
      })
      .catch(error => {
        console.error("Failed to fetch post details:", error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");
    if (confirmDelete) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/post/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          navigate("/");
        } else {
          alert("Failed to delete the post. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-pulse text-xl">Loading post...</div>
      </div>
    );
  }

  if (!postInfo) return <p>Post not found</p>;

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @OmarEmad</div>
      
      <div className="img">
        <img
          src={`${import.meta.env.VITE_API_URL}/${postInfo.cover}`}
          alt={postInfo.title}
        />
      </div>
      
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      
      <div className="buttons">
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
        <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Edit</Link>
      </div>
    </div>
  );
};

export default PostPage;