import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_MOVIES } from './query';

function MovieList() {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Movies</h1>
      {data.movies.map((movie) => (
        <div key={movie.ids}>
          <h2>{movie.title} ({movie.year})</h2>
          <p>Actors: {movie.actorsIn.map((actor) => actor.name).join(', ')}</p>
          <p>Director: {movie.directedBy?.name || 'Unknown'}</p>
          <p>Genres: {movie.genres.map((genre) => genre.type).join(', ')}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
