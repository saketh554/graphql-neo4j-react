import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MOVIE_BY_TITLE } from './query';

function MovieDetails() {
  const [title, setTitle] = useState('');
  const [getMovie, { loading, error, data }] = useLazyQuery(GET_MOVIE_BY_TITLE);

  const handleSearch = () => {
    if (title) {
      getMovie({ variables: { title } });
    }
  };

  return (
    <div>
      <h2>Search for a Movie</h2>
      <input
        type="text"
        placeholder="Enter movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.movies.length > 0 ? (
        <div>
          <h2>{data.movies[0].title} ({data.movies[0].year})</h2>
          <p>{data.movies[0].description}</p>
          <p>Actors: {data.movies[0].actorsIn.map((actor) => actor.name).join(', ')}</p>
          <p>Director: {data.movies[0].directedBy?.name || 'Unknown'}</p>
          <p>Genres: {data.movies[0].genres.map((genre) => genre.type).join(', ')}</p>
        </div>
      ) : (
        <p>No movie found.</p>
      )}
    </div>
  );
}

export default MovieDetails;
