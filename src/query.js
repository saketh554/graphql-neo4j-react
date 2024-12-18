import { gql } from '@apollo/client';

// Query to get all movies
export const GET_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      ids
      title
      year
      description
      actorsIn {
        name
      }
      directedBy {
        name
      }
      genres {
        type
      }
    }
  }
`;

// Query to get a movie by title
export const GET_MOVIE_BY_TITLE = gql`
  query GetMovieByTitle($title: String!) {
    movies(where: { title: $title }) {
      ids
      title
      year
      description
      actorsIn {
        name
      }
      directedBy {
        name
      }
      genres {
        type
      }
    }
  }
`;

// Mutation to add a movie


// Mutation to update a movie
export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($title: String!, $year: Int, $description: String) {
    updateMovies(
      where: { title: $title }
      update: { year: $year, description: $description }
    ) {
      movies {
        title
        year
        description
      }
    }
  }
`;

// Mutation to delete a movie
export const DELETE_MOVIE = gql`
  mutation DeleteMovie($title: String!) {
    deleteMovies(where: { title: $title }) {
      nodesDeleted
    }
  }
`;
export const GET_MOVIES_BY_STARTING_LETTER = gql`
  query GetMoviesByStartingLetter($letter: String!) {
    movies(where: { title_STARTS_WITH: $letter }) {
      title
    }
  }
`;
export const GET_MOVIES_BY_STARTING_LETTER_DESC = gql`
  query GetMoviesByStartingLetterDesc($letter: String!) {
    moviesByStartingLetter(letter: $letter) {
      count
      movies {
        title
      }
    }
  }
`;
export const GET_ALL_ACTORS = gql`
  query GetAllActors {
    actors {
      name
    }
  }
`;

export const GET_ALL_DIRECTORS = gql`
  query GetAllDirectors {
    directors {
      name
    }
  }
`;

export const GET_ALL_GENRES = gql`
  query GetAllGenres {
    genres {
      type
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovieWithRelations($input: [MovieCreateInput!]!) {
    createMovies(input: $input) {
      movies {
        ids
        title
        year
        description
      }
    }
  }
`;

