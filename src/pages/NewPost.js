import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');  // HTML content
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content); // এখন HTML markup সহ save হবে
    if (image) formData.append('image', image);

    await API.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mt-4">
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Title"
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
        </div>

        {/* Rich Text Editor */}
        <div className="mb-3">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            placeholder="Write your content here..." 
          />
        </div>

        <div className="mb-3">
          <input 
            type="file" 
            className="form-control" 
            onChange={e => setImage(e.target.files[0])} 
          />
        </div>
        
        <button className="btn btn-primary">Add Post</button>
      </form>
    </div>
  );
}
