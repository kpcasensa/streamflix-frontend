import React, { useEffect, useState} from "react";
import { getMovies, deleteMovie } from '../api/movieApi';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const fetchMovies = async () => {
        const res = await getMovies();
        setMovies(res.data);
    };

    const handleDelete = async (id) => {
        await deleteMovie(id);
        fetchMovies();
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Movies</h1>
            <Link to="/add">Add new Movie</Link>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        <Link to={`/view/${movie.id}`}>{movie.title}</Link>
                        <button onClick={() => handleDelete(movie.id)}>Delete</button>
                        <Link to={`/edit/${movie.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default MovieList;