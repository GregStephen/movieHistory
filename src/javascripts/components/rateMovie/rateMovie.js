import $ from 'jquery';

const addOrEditMovieRating = (e) => {
  const newRating = e.target.value;
  const movieId = e.target.id;
  console.error('movie rated:', newRating, 'movId', movieId);
};

const rateMovieEventHandler = () => {
  $('#movies').on('click', '.rateStar', addOrEditMovieRating);
};

export default { rateMovieEventHandler };
