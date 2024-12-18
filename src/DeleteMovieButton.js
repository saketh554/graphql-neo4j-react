import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_MOVIE } from './query';

function DeleteMovieButton() {
  const [title, setTitle] = useState('');
  const [deleteMovie, { loading, error }] = useMutation(DELETE_MOVIE, {
    onCompleted: (data) => {
      if (data.deleteMovies.nodesDeleted > 0) {
        alert('Movie deleted successfully');
      } else {
        alert('No movie found with the given title');
      }
      setTitle('');
    },
    onError: (error) => {
      console.error('Error deleting movie:', error);
      alert('An error occurred while trying to delete the movie');
    },
  });

  const handleDelete = () => {
    if (title.trim()) {
      deleteMovie({ variables: { title } });
    } else {
      alert('Please enter a movie title');
    }
  };

  return (
    <div>
      <h2>Delete Movie</h2>
      <input
        type="text"
        placeholder="Title (to delete)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Movie'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
}

export default DeleteMovieButton;
