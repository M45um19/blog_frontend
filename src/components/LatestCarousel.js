import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function LatestCarousel() {
  const [posts, setPosts] = useState([]);

useEffect(() => {
  API.get("/posts?limit=3&page=1")
    .then((res) => {
      setPosts(res.data.posts);     
    })
    .catch((err) => console.error(err));
}, []);

  return (
    <div className="">

      <div id="latestCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner rounded shadow-lg">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={post.imageUrl}
                className="d-block w-100"
                alt={post.title}
                style={{ height: "500px", objectFit: "cover" }}
              />
               <div className="carousel-caption d-flex flex-column align-items-center justify-content-center p-3" style={{ background: 'transparent' }}>
                    <h3 className="fw-bold text-white">{post.title}</h3>
                    <Link
                    to={`/post/${post._id}`}
                    className="btn btn-primary mt-2 px-4"
                    >
                    Read More
                    </Link>
                </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#latestCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#latestCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
