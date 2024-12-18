import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_MOVIES_BY_STARTING_LETTER_DESC } from './query';

function MoviesByLetterWithCount() {
  const [letter, setLetter] = useState('');
  const [getMovies, { loading, error, data }] = useLazyQuery(GET_MOVIES_BY_STARTING_LETTER_DESC);

  const handleSearch = () => {
    if (letter.trim()) {
      getMovies({ variables: { letter: letter.toUpperCase() } });
    }
  };

  return (
    <div>
      <h2>Find Movies by Starting Letter (Descending Order)</h2>
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
      {data && (
        <div>
          <h3>Total Movies: {data.moviesByStartingLetter.count}</h3>
          <ul>
            {data.moviesByStartingLetter.movies.map((movie, index) => (
              <li key={index}>{movie.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MoviesByLetterWithCount;
