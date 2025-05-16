import React, { useState } from 'react';
import { addMovie } from '../api/movieApi';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Add New Movie</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>File:</label>
          <input type="file" name="video_file" onChange={handleChange} required />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;
