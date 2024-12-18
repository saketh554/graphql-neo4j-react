import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MOVIES_BY_STARTING_LETTER } from './query';

function MoviesByStartingLetter() {
  const [letter, setLetter] = useState('');
  const [getMovies, { loading, error, data }] = useLazyQuery(GET_MOVIES_BY_STARTING_LETTER);

  const handleSearch = () => {
    if (letter.trim()) {
      getMovies({ variables: { letter: letter.toUpperCase() } });
    }
  };

  return (
    <div>
      <h2>Find Movie Titles by Starting Letter</h2>
      <input
        type="text"
        placeholder="Enter starting letter"
        value={letter}
        maxLength={1}
        onChange={(e) => setLetter(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {data && data.movies.length > 0 ? (
        <ul>
          {data.movies.map((movie, index) => (
            <li key={index}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        data && <p>No movies found starting with '{letter.toUpperCase()}'.</p>
      )}
    </div>
  );
}

export default MoviesByStartingLetter;
