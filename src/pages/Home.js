import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import LatestCarousel from "../components/LatestCarousel";
import { FaSearch } from "react-icons/fa";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    const res = await API.get(`/posts?page=${page}&limit=${limit}`);
    setPosts(res.data.posts);
    setTotalPages(res.data.totalPages);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchPosts([]);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchPosts(filtered);
    }
  };

  // pagination numbers (max 5 visible)
  const getPaginationNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div>
      <LatestCarousel />

      <div className='container mt-4'>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>All Posts</h2>
          <div className="position-relative">
            {showSearchInput ? (
              <input
                type="text"
                className="form-control"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchChange}
                onBlur={() => { if(searchTerm==="") setShowSearchInput(false) }}
                autoFocus
                style={{ width: '200px' }}
              />
            ) : (
              <FaSearch
                onClick={() => setShowSearchInput(true)}
                style={{ cursor: 'pointer', fontSize: '1.2rem' }}
              />
            )}
          </div>
        </div>

        {/* All Posts */}
        {searchTerm.trim() === "" && (
          <div className="row">
            {posts.map(post => (
              <div key={post._id} className="col-md-4 mb-3 mt-3">
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://localhost:5000${post.imageUrl}`}
                    className="card-img-top p-3"
                    alt={post.title}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{post.title}</h5>
<small className="text-white">
    {
        (() => {
            const rawContent = post.content;
            if (!rawContent) return '';


            const plainText = rawContent.replace(/<[^>]*>/g, '');

            const words = plainText.split(/\s+/).filter(word => word.length > 0); 
            
            const limitedWords = words.slice(0, 30).join(' ');
            
            return limitedWords + (words.length > 20 ? '...' : '');
        })()
    }
</small>
                    <Link
                      to={`/post/${post._id}`}
                      className="btn align-self-start mt-3 btn_css"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {/* Pagination */}
{searchTerm.trim() === "" && totalPages > 1 && (
  <nav className="d-flex justify-content-center mt-4">
    <ul className="pagination custom-pagination">
      <li className={`page-item ${currentPage === 1 && "disabled"}`}>
        <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
          &laquo;
        </button>
      </li>

      {getPaginationNumbers().map(num => (
        <li key={num} className={`page-item ${num === currentPage && "active"}`}>
          <button className="page-link" onClick={() => setCurrentPage(num)}>
            {num}
          </button>
        </li>
      ))}

      <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
        <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
          &raquo;
        </button>
      </li>
    </ul>
  </nav>
)}


        {/* Search Results */}
        {searchTerm.trim() !== "" && (
          <div className="row">
            {searchPosts.length > 0 ? (
              searchPosts.map(post => (
                <div key={post._id} className="col-md-4 mb-3 mt-3">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={`http://localhost:5000${post.imageUrl}`}
                      className="card-img-top p-3"
                      alt={post.title}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{post.title}</h5>
                      <Link
                        to={`/post/${post._id}`}
                        className="btn align-self-start mt-2 btn_css"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No posts found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
