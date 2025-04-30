import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setLoading(false);
        })
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  async function updatePost(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.set('id', id!);
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (file) {
      data.append('file', file);
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
        method: 'PUT',
        body: data,
      });
      if (response.ok) {
        setRedirect(true);
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('An error occurred while updating the post');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Post</h1>
      <form onSubmit={updatePost} className="form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="Title"
            value={title}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setTitle(ev.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary" className="form-label">Summary</label>
          <input
            id="summary"
            type="text"
            className="form-input"
            placeholder="Summary"
            value={summary}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSummary(ev.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">Featured Image</label>
          <input
            id="image"
            type="file"
            className="form-input"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              if (ev.target.files && ev.target.files.length > 0) {
                setFile(ev.target.files[0]);
              } else {
                setFile(undefined);
              }
            }}
          />
          <p className="text-sm text-muted-foreground mt-1">Leave empty to keep the current image</p>
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">Content</label>
          <div className="quill-editor">
            <ReactQuill
              value={content}
              modules={modules}
              formats={formats}
              onChange={(newValue) => setContent(newValue)}
            />
          </div>
        </div>

        <div className="form-submit">
          <button 
            type="submit" 
            className="formButton"
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
