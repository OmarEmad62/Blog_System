import { formatISO9075 } from "date-fns";
import  { useEffect, useState } from "react";
import { useParams,Link, useNavigate } from "react-router-dom";


interface postInfo {
  _id:string;
  title: string;
  summary: string;
  content: string;
  cover: string;
  createdAt:string;
}


const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState<postInfo | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);
  const handleDelete = async () => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    //if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/post/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
         // alert("Post deleted successfully.");
          navigate("/");
        } else {
          alert("Failed to delete the post. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("An error occurred. Please try again.");
      }
   //}
  };

  if (!postInfo) return <p>Loading...</p>;

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @OmarEmad</div>
      <div className="edit-row">
      </div>
      <div className="buttons">
      <button className="delete-btn" onClick={handleDelete}> Delete </button>
      <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Edit </Link>
      </div>
      <div className="img">
        <img
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
        />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default PostPage;
