import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_MOVIE, GET_ALL_ACTORS, GET_ALL_DIRECTORS, GET_ALL_GENRES } from './query';

function AddMovieForm() {
  const [ids, setIds] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [actorCount, setActorCount] = useState(0); // Number of actors to input
  const [actorInputs, setActorInputs] = useState([]); // Dynamic list for actor selection
  const [newActors, setNewActors] = useState([]); // List for new actor names
  const [selectedDirector, setSelectedDirector] = useState('');
  const [newDirector, setNewDirector] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');

  const { data: actorData } = useQuery(GET_ALL_ACTORS);
  const { data: directorData } = useQuery(GET_ALL_DIRECTORS);
  const { data: genreData } = useQuery(GET_ALL_GENRES);

  const [addMovie] = useMutation(ADD_MOVIE);

  // Handle actor count change
  const handleActorCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setActorCount(count);
    setActorInputs(Array.from({ length: count }, (_, i) => ({ existing: '', new: '' })));
  };

  // Update existing actor selection
  const updateExistingActor = (index, value) => {
    const updatedInputs = [...actorInputs];
    updatedInputs[index].existing = value;
    setActorInputs(updatedInputs);
  };

  // Update new actor input
  const updateNewActor = (index, value) => {
    const updatedInputs = [...actorInputs];
    updatedInputs[index].new = value;
    setActorInputs(updatedInputs);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare actor nodes
    const actorNodes = [];
    actorInputs.forEach((input) => {
      if (input.existing) {
        actorNodes.push({ connect: { where: { node: { name: input.existing } } } });
      }
      if (input.new) {
        actorNodes.push({ create: { node: { name: input.new } } });
      }
    });

    // Prepare director node
    const directorNode = newDirector
      ? { create: { node: { name: newDirector } } }
      : { connect: { where: { node: { name: selectedDirector } } } };

    // Prepare genre nodes
    const genreNodes = selectedGenres.map((genre) => ({ connect: { where: { node: { type: genre } } } }));
    if (newGenre) {
      genreNodes.push({ create: { node: { type: newGenre } } });
    }

    // Execute mutation
    await addMovie({
      variables: {
        input: [
          {
            ids,
            title,
            year: parseInt(year),
            description,
            actorsIn: actorNodes.length > 0 ? { connectOrCreate: actorNodes } : null,
            directedBy: directorNode,
            genres: genreNodes.length > 0 ? { connectOrCreate: genreNodes } : null,
          },
        ],
      },
    });

    alert('Movie added successfully');
    setIds('');
    setTitle('');
    setYear('');
    setDescription('');
    setActorCount(0);
    setActorInputs([]);
    setNewActors([]);
    setSelectedDirector('');
    setNewDirector('');
    setSelectedGenres([]);
    setNewGenre('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Movie</h2>
      <input
        type="text"
        placeholder="IDs"
        value={ids}
        onChange={(e) => setIds(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Actor Count */}
      <h3>Number of Actors</h3>
      <input
        type="number"
        placeholder="Enter number of actors"
        value={actorCount}
        onChange={handleActorCountChange}
      />

      {/* Actor Inputs */}
      {actorInputs.map((input, index) => (
        <div key={index}>
          <h4>Actor {index + 1}</h4>
          <select
            value={input.existing}
            onChange={(e) => updateExistingActor(index, e.target.value)}
          >
            <option value="">Select an existing actor</option>
            {actorData &&
              actorData.actors.map((actor) => (
                <option key={actor.name} value={actor.name}>
                  {actor.name}
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="New Actor Name"
            value={input.new}
            onChange={(e) => updateNewActor(index, e.target.value)}
          />
        </div>
      ))}

      {/* Director Dropdown */}
      <h3>Director</h3>
      <select
        value={selectedDirector}
        onChange={(e) => setSelectedDirector(e.target.value)}
      >
        <option value="">Select a director</option>
        {directorData &&
          directorData.directors.map((director) => (
            <option key={director.name} value={director.name}>
              {director.name}
            </option>
          ))}
      </select>
      <input
        type="text"
        placeholder="New Director"
        value={newDirector}
        onChange={(e) => setNewDirector(e.target.value)}
      />

      {/* Genre Dropdown */}
      <h3>Genres</h3>
      <select
        multiple
        value={selectedGenres}
        onChange={(e) =>
          setSelectedGenres(Array.from(e.target.selectedOptions, (option) => option.value))
        }
      >
        {genreData &&
          genreData.genres.map((genre) => (
            <option key={genre.type} value={genre.type}>
              {genre.type}
            </option>
          ))}
      </select>
      <input
        type="text"
        placeholder="New Genre"
        value={newGenre}
        onChange={(e) => setNewGenre(e.target.value)}
      />

      <button type="submit">Add Movie</button>
    </form>
  );
}

export default AddMovieForm;
