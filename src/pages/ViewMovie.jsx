import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovie, deleteMovie } from '../api/movieApi';

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
  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      {movie.video_file && (
        <div>
          <video width="640" height="360" controls>
            <source src={movie.video_file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <button onClick={handleDelete} style={{ color: 'red' }}>
        Delete Movie
      </button>
      <Link to="/">Back to Movies</Link>
    </div>
  );
};

export default ViewMovie;
