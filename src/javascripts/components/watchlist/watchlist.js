import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import watchlistData from '../../helpers/data/watchlistData';

const addMovie = (e) => {
  const newMovie = {
    isWatched: false,
    uid: firebase.auth().currentUser.uid,
    rating: 0,
    movieId: e.target.id,
  };
  watchlistData.addNewMovieToWatchlist(newMovie)
    .then(() => {
      e.target.classList.add('hide');
      e.target.nextElementSibling.classList.remove('hide');
    })
    .catch(err => console.error('no new movie', err));
};

const removeMovie = (e) => {
  const UserMoveId = e.target.id;
  watchlistData.removeMovieFromWatchlist(UserMoveId)
    .then(() => {
      e.target.classList.add('hide');
      e.target.nextElementSibling.classList.remove('hide');
    })
    .catch(err => console.error('no new movie', err));
};

const addMovieToWatchlistButtonEvent = () => {
  $('#movies').on('click', '.add-to-watchlist', addMovie);
  $('#movies').on('click', '.remove-from-watchlist', removeMovie);
};

export default { addMovieToWatchlistButtonEvent };
