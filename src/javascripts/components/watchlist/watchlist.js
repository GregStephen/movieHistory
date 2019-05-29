import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import watchlistData from '../../helpers/data/watchlistData';
import movies from '../movies/movies';

const addMovie = (e) => {
  const uId = firebase.auth().currentUser.uid;
  const newMovie = {
    isWatched: false,
    uid: uId,
    rating: 0,
    movieId: e.target.id,
  };
  watchlistData.addNewMovieToWatchlist(newMovie)
    .then(() => {
      // e.target.classList.add('hide');
      // e.target.nextElementSibling.classList.remove('hide');
      movies.movieStringBuilder(uId);
    })
    .catch(err => console.error('no new movie', err));
};

const removeMovie = (e) => {
  const uId = firebase.auth().currentUser.uid;
  const UserMoveId = e.target.id;
  console.error(UserMoveId);
  watchlistData.removeMovieFromWatchList(UserMoveId)
    .then(() => {
      // e.target.classList.add('hide');
      // e.target.previousElementSibling.classList.remove('hide');
      movies.movieStringBuilder(uId);
    })
    .catch(err => console.error('no new movie', err));
};

const addMovieToWatchlistButtonEvent = () => {
  $('#movies').on('click', '.add-to-watchlist', addMovie);
  $('#movies').on('click', '.remove-from-watchlist', removeMovie);
};

export default { addMovieToWatchlistButtonEvent };
