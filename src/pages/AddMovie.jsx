import React, { useState } from 'react';
import { addMovie } from '../api/movieApi';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_file: null,
  });

  const navigate = useNavigate();

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

    await addMovie(data);
    navigate('/');
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center px-4">
      <Navbar />

      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add New Movie</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
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
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Video File</label>
            <input
              type="file"
              name="video_file"
              onChange={handleChange}
              required
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0
                         file:text-sm file:font-semibold
                         file:bg-red-600 file:text-white
                         hover:file:bg-red-700"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
