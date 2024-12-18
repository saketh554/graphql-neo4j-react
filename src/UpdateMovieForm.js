import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_MOVIE } from './query';

function UpdateMovieForm() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [updateMovie] = useMutation(UPDATE_MOVIE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMovie({
      variables: {
        title,
        year: year ? parseInt(year) : null,
        description: description || null,
      },
    });
    alert('Movie updated successfully');
    setTitle('');
    setYear('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Movie</h2>
      <input
        type="text"
        placeholder="Title (to find the movie)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Update Movie</button>
    </form>
  );
}

export default UpdateMovieForm;
