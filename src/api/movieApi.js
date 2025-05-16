import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/movies";

export const getMovies = () => axios.get(API_URL);
export const getMovie = (id) => axios.get(`${API_URL}/${id}/`);
export const addMovie = (data) => axios.post(API_URL, data);
export const updateMovie = (id, data) => axios.put(`${API_URL}/${id}/`, data);
export const deleteMovie = (id) => axios.delete(`${API_URL}/${id}/`);