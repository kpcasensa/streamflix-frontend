import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMovie, updateMovie } from '../api/movieApi';
import Navbar from '../components/Navbar';

const EditMovie = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_file: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await getMovie(id);
      setFormData({
        title: res.data.title,
        description: res.data.description,
        video_file: null, // keep null to avoid pre-filling file input
      });
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'video_file') {
      setFormData({ ...formData, video_file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.video_file) {
      data.append('video_file', formData.video_file);
    }

    await updateMovie(id, data);
    navigate('/');
  };

  return (
    <div className="bg-black min-h-screen text-white px-6 py-8 flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      <div className="mt-20 max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-8">Edit Movie</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-300">Replace Video File (optional)</label>
            <input
              type="file"
              name="video_file"
              onChange={handleChange}
              className="w-full text-gray-300"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
            >
              Update Movie
            </button>
            <Link
              to="/"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-semibold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
