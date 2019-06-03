import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import watchlistData from '../../helpers/data/watchlistData';
import movies from '../movies/movies';


const addMovieToWatchList = (e) => {
  const uId = firebase.auth().currentUser.uid;
  const newMovie = {
    isOnWatchList: true,
    isWatched: false,
    uid: uId,
    rating: 0,
    movieId: e.target.id,
  };
  watchlistData.addNewMovieToUserMovieList(newMovie)
    .then(() => {
      movies.movieStringBuilder(uId);
    })
    .catch(err => console.error('error on add movie to watchlist', err));
};

const removeMovie = (e) => {
  const uId = firebase.auth().currentUser.uid;
  const UserMoveId = e.target.id;
  watchlistData.removeMovieFromWatchList(UserMoveId)
    .then(() => {
      movies.movieStringBuilder(uId);
    })
    .catch(err => console.error('error on remove movie from watchlist', err));
};

const showWatchlistAmount = () => {
  const uId = firebase.auth().currentUser.uid;
  watchlistData.showOnlyWatchlist(uId)
    .then((resp) => {
      const respLength = resp.length;
      console.error(respLength);
      return respLength;
    })
    .catch(err => console.error('cant show watchlist', err));
};

const watchlistButtonEvent = () => {
  $('#movies').on('click', '.add-to-watchlist', addMovieToWatchList);
  $('#movies').on('click', '.remove-from-watchlist', removeMovie);
  $('#movies').on('click', '#show-watchlist', showWatchlistAmount);
};

export default { watchlistButtonEvent };
