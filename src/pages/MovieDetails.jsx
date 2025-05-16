import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovie, deleteMovie } from '../api/movieApi';
import Navbar from '../components/Navbar';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovie(id);
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await deleteMovie(id);
      navigate('/');
    }
  };

  if (!movie) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />
      <div className="pt-24 px-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg mb-6 text-gray-300 text-center max-w-2xl">{movie.description}</p>
        {movie.video_file && (
          <div className="mb-8">
            <video className="rounded-lg shadow-lg" width="800" height="450" controls>
              <source src={movie.video_file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/edit/${movie.id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
          >
            Edit Movie
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
          >
            Delete Movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
