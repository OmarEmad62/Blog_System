import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';


const EditPost = () => {
    const {id}=useParams();
    const [title, setTitle] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [file, setFile] = useState<File | undefined>(undefined);
    const [redirect,setRedirect]=useState<boolean>(false);
    useEffect(()=>{
        fetch('http://localhost:4000/post/'+id)
        .then(response=>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
        })
    },[])
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
    async function updatePost(ev: React.FormEvent<HTMLFormElement>){
        ev.preventDefault();
        const data = new FormData();
        data.set('id', id!);
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if (file) {
            data.append('file', file); 
        }
       const response= await fetch('http://localhost:4000/post',{
            method:'PUT',
            body:data,
        });
        if(response.ok){
            setRedirect(true);
        }
     }
    if(redirect){
        return <Navigate to={'/post/'+id}/>
      }
      return (
        <form onSubmit={updatePost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setTitle(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Summary"
            value={summary}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setSummary(ev.target.value)}
          />
          <input
            type="file"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              if (ev.target.files && ev.target.files.length > 0) {
                setFile(ev.target.files[0]);
              } else {
                setFile(undefined);
              }
            }}
          />
          <ReactQuill
            value={content}
            modules={modules}
            formats={formats}
            onChange={(newValue) => setContent(newValue)}
          />
          <button className='formButton-edit'>Submit</button>
        </form>
      );
    };
export default EditPost
