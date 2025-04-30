
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { openDB } from 'idb';
const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
    handlers: {
      image: async function (this: any) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
          if (input.files && input.files[0]) {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('file', file);

            try {
              const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: 'POST',
                body: formData,
              });

              if (response.ok) {
                const data = await response.json();
                const imageUrl = data.url; 

                const quill = this.quill;
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', imageUrl); 
              } else {
                console.error('Image upload failed');
              }
            } catch (err) {
              console.error('Error uploading image:', err);
            }
          }
        };
      },
    },
  },
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
const CreatePosts = () => {
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [saveAsDraft, setSaveAsDraft] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingDraft, setLoadingDraft] = useState<boolean>(true);

  const DB_NAME = 'postDB';
  const STORE_NAME = 'draft';

  const openDatabase = async () => {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    });
  };

  const saveDraft = async () => {
    const db = await openDatabase();
    const fileData = file ? await file.text() : null;
    const data = {
      id: 'draft',
      title,
      summary,
      content,
      file: file ? { name: file.name, data: fileData } : null,
    };
    await db.put(STORE_NAME, data);
  };

  const loadDraft = async () => {
    setLoadingDraft(true);
    try {
      const db = await openDatabase();
      const draft = await db.get(STORE_NAME, 'draft');
      if (draft) {
        setTitle(draft.title || '');
        setSummary(draft.summary || '');
        setContent(draft.content || '');
        if (draft.file) {
          const restoredFile = new File([draft.file.data], draft.file.name);
          setFile(restoredFile);
        }
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    } finally {
      setLoadingDraft(false);
    }
  };

  useEffect(() => {
    loadDraft();
  }, []);


  async function createNewPost(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsSubmitting(true);

    if (saveAsDraft) {
      await saveDraft();
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (file) {
      data.append('file', file);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/post`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        if (!saveAsDraft) {
          const db = await openDatabase();
          await db.delete(STORE_NAME, 'draft');
        }
        setRedirect(true);
      } else {
        alert('Error creating post. Please try again.');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (loadingDraft) {
    return (
      <div className="container">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-8 text-center">Create New Post</h1>
      <form onSubmit={createNewPost} className="form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="Enter post title"
            value={title}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setTitle(ev.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary" className="form-label">Summary</label>
          <input
            id="summary"
            type="text"
            className="form-input"
            placeholder="Brief summary of your post"
            value={summary}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSummary(ev.target.value)}
            required
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
            required={!file}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">Content</label>
          <div className="quill-editor">
            <ReactQuill
              value={content}
              modules={modules}
              formats={formats}
              onChange={(newValue) => setContent(newValue)}
              placeholder="Write your post content here..."
            />
          </div>
        </div>

        <label className="checkbox-label mt-4">
          <input
            type="checkbox"
            className="checkbox"
            checked={saveAsDraft}
            onChange={(ev) => setSaveAsDraft(ev.target.checked)}
          />
          <span>Save as Draft</span>
        </label>

        <div className="form-submit">
          <button 
            type="submit" 
           className="formButton"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePosts;
