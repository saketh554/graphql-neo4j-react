import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import AddMovieForm from './AddMovieForm';
import UpdateMovieForm from './UpdateMovieForm';
import DeleteMovieButton from './DeleteMovieButton';
import MoviesByStartingLetter from './MoviesByStartingLetter'; 
import MoviesByLetterWithCount from './MoviesByLetterWithCount';
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/movies">All Movies</Link></li>
            <li><Link to="/movie-details">Search Movie by Title</Link></li>
            <li><Link to="/add-movie">Add Movie</Link></li>
            <li><Link to="/update-movie">Update Movie</Link></li>
            <li><Link to="/delete-movie">Delete Movie</Link></li>
            <li><Link to="/movies-by-letter">Movies by Starting Letter</Link></li> {/* New link */}
            <li><Link to="/movies-by-letter-with-count">Movies by Letter with Count</Link></li>
           
          </ul>
        </nav>

        <Routes>
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movie-details" element={<MovieDetails />} />
          <Route path="/add-movie" element={<AddMovieForm />} />
          <Route path="/update-movie" element={<UpdateMovieForm />} />
          <Route path="/delete-movie" element={<DeleteMovieButton />} />
          <Route path="/movies-by-letter" element={<MoviesByStartingLetter />} /> {/* New route */}
          <Route path="/movies-by-letter-with-count" element={<MoviesByLetterWithCount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
