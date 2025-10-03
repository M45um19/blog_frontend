import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // HTML content
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/posts/${id}`).then(res => {
      setTitle(res.data.title);
      setContent(res.data.content); // এখানে HTML load হবে
      setImage(res.data.imageUrl);
    });
  }, [id]);

  const handleNewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content); // HTML content যাবে
    if (newImage) formData.append('image', newImage);

    try {
      await API.put(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
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
            placeholder="Edit your content..."
          />
        </div>

        {/* Image Preview */}
        <div className="mb-3 w-25">
          {preview ? (
            <img src={preview} alt="new" className="img-thumbnail" />
          ) : image ? (
            <img
              src={image}
              alt="old"
              className="img-thumbnail"
            />
          ) : null}
        </div>

        {/* File Upload */}
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleNewImage}
          />
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary">Update Post</button>
      </form>
    </div>
  );
}
