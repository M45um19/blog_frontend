import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = () => {
    API.get('/posts').then(res => {
      console.log("API response:", res.data); 
      setPosts(res.data.posts || []);
    });
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await API.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-success mb-3" onClick={() => navigate('/admin/new')}>New Post</button>

      <ul className="list-group">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(p => (
            <li key={p._id} className="list-group-item d-flex justify-content-between">
              {p.title}
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/admin/edit/${p._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No posts found</li>
        )}
      </ul>
    </div>
  );
}
