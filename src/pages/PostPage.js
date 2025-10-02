import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { jwtDecode } from 'jwt-decode';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const token = localStorage.getItem('token');

  let username = 'Anonymous';
  let isAdmin = false;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        username = decoded.username;
        isAdmin = decoded.isAdmin;
      } catch {}
    }
  

  useEffect(() => {
    API.get(`/posts/${id}`).then(res => setPost(res.data));
    fetchComments();
  }, [id]);

  const fetchComments = () => {
    API.get(`/comments/${id}`).then(res => setComments(res.data));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await API.post(`/comments/${id}`, { text: newComment , author: username});
    setNewComment('');
    fetchComments();
  };

  const handleDeleteComment = async (id) => {
    await API.delete(`/comments/${id}`);
    await fetchComments();
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
<h2 className='text-center'>{post.title}</h2>
{post.imageUrl && (
  <img 
    src={`http://localhost:5000${post.imageUrl}`} 
    alt={post.title} 
    className="w-75 mb-3 rounded mx-auto d-block mt-5" 
  />
)}

{/* Render content with HTML markup */}
<div 
  className="post-content mb-5 mt-5"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>

      <hr />
      <h4>Comments</h4>
      {
        (token) ? <form onSubmit={handleCommentSubmit} className="mb-3">
        <textarea
          className="form-control mb-2"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button className="common-btn">Post Comment</button>
      </form> : (
        <p>You must be logged in to write a comment.</p>
      )
      }
      

      <ul className="list-group">
        {comments.map((c) => (
          <li key={c._id} className="list-group-item">
            <strong>{c.author}:</strong> {c.text}{isAdmin ? <a className=' btn fw-bold text-danger' onClick={ () => handleDeleteComment(c._id) }>|| DELETE</a> : null } 
            <br />
            <small className="text-secondary">{new Date(c.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
