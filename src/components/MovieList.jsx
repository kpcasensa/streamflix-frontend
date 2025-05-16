import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../api/movieApi';
import { EyeIcon, PlayIcon } from '@heroicons/react/24/solid';

const placeholderThumbnail  = 'images/placeholder-thumbnail.png';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies();
      setMovies(res.data);
    };
    fetchMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-3xl font-bold text-red-600">StreamFlix</h1>
        <Link to="/add" className="text-white hover:text-red-500">Add Movie</Link>
      </nav>

      {/* Movie Grid */}
      <div className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="group relative">
              <div className="aspect-w-2 aspect-h-3 bg-gray-800 rounded-lg overflow-hidden shadow-md relative">
                <img
                  src={movie.thumbnail || placeholderThumbnail}
                  alt={movie.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />

                {/* Overlay Icons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 group-hover:opacity-100 transition">
                  <Link to={`/details/${movie.id}`} title="View Details">
                    <EyeIcon className="h-8 w-8 text-white hover:text-blue-400" />
                  </Link>
                  <Link to={`/view/${movie.id}`} title="Watch Movie">
                    <PlayIcon className="h-8 w-8 text-white hover:text-green-400" />
                  </Link>
                </div>
              </div>

              <div className="mt-2 text-center">
                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                <p className="text-xs text-gray-400">
                  {movie.date_added}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
