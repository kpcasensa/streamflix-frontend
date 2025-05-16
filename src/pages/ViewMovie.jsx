import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovie, deleteMovie } from '../api/movieApi';
import Navbar from '../components/Navbar';

const ViewMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await deleteMovie(id);
      navigate('/');
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovie(id);
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white px-6 py-8 flex flex-col items-center">
      <Navbar />

      <div className="mt-20 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="text-gray-300 mb-8">{movie.description}</p>

        {movie.video_file && (
          <div className="mb-8 rounded overflow-hidden shadow-lg">
            <video
              className="w-full rounded-lg border border-gray-700"
              controls
            >
              <source src={movie.video_file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMovie;
