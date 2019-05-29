import $ from 'jquery';

const addMovieToDatabase = () => {
  console.error('hey add movie');
};

const addMovieButtonEvent = () => {
  $('#movies').on('click', '#add-movie-button', addMovieToDatabase);
};

export default { addMovieButtonEvent };
