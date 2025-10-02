import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.isAdmin;
    } catch {}
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand my-2" to="/">My Blog</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
  {isAdmin ? (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item ms-2">
        <button className="btn btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : token ? (
    <li className="nav-item ms-2">
      <button className="btn btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </li>
  ) : (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/login">Login</Link>
      </li>
      <li className="nav-item ms-2">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
    </>
  )}
</ul>
        </div>
      </div>
    </nav>
  );
}
