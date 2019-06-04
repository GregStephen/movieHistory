import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import watchlistData from '../../helpers/data/watchlistData';
import movies from '../movies/movies';
import movieData from '../../helpers/data/movieData';
import util from '../../helpers/util';


const addMovieToWatchList = (e) => {
  const uId = firebase.auth().currentUser.uid;
  console.error(e.target.id);
  const movieUserId = e.target.previousElementSibling.id;
  if (movieUserId === '') {
    console.error(movieUserId);
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
  } else {
    watchlistData.changeMovieWatchList(movieUserId, true).then(() => {
      movies.movieStringBuilder(uId);
    })
      .catch(err => console.error('error on add movie to watchlist', err));
  }
};

const removeMovie = (e) => {
  const uId = firebase.auth().currentUser.uid;
  const UserMoveId = e.target.id;
  watchlistData.changeMovieWatchList(UserMoveId, false)
    .then(() => {
      movies.movieStringBuilder(uId);
    })
    .catch(err => console.error('error on remove movie from watchlist', err));
};

const watchlistMovieStringBuilder = () => {
  const uId = firebase.auth().currentUser.uid;
  movieData.getAllMovies(uId)
    .then((moviesResp) => {
      const moviesOnWatchlist = moviesResp.filter(movie => movie.isOnWatchList === true);
      let dDomstring = '<div class="row justify-content-between mt-5">';
      dDomstring += '<h1>Your Watchlist</h1>';
      dDomstring += '<button type="button" id="show-all-movies" class="btn btn-outline-success">Show All Movies</button>';
      dDomstring += '</div>';
      dDomstring += '<div id="moviesDisplay" class="container"></div>';
      util.printToDom('movies', dDomstring);
      let domstring = '<div class="row justify-content-around mt-5">';
      if (moviesOnWatchlist.length === 0) {
        domstring += '<h2>HEY! You should add some movies to your watchlist first!</h2>';
      } else {
        moviesOnWatchlist.forEach((movie) => {
          domstring += '<div class="d-flex col-12 col-md-4 col-lg-3 mb-4">';
          domstring += '<div class="card">';
          domstring += '<div class="card-header">';
          domstring += `<h5 class="movie-title">${movie.title}</h5>`;
          domstring += '</div>';
          domstring += `<img class="movie-poster card-img-top" src="${movie.imageUrl}" alt="Poster for ${movie.title}">`;
          domstring += '<div class="card-body">';
          domstring += '<div class="row justify-content-between">';
          domstring += '<div class="col-auto">';
          domstring += `<h6>${movie.releaseDate}</h6>`;
          domstring += `<h6>${movie.mpaaRating}</h6>`;
          domstring += '</div>';
          domstring += '<div class="watchlistButtonDiv col-auto">';
          domstring += '<i class="fas fa-clock fa-2x"></i>';
          domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x remove-from-watchlistInWatchlist"></button>`;
          domstring += '</div>';
          domstring += '</div>';
          domstring += '</div>';
          domstring += '</div>';
          domstring += '</div>';
        });
        domstring += '</div>';
      }
      util.printToDom('moviesDisplay', domstring);
    }).catch(err => console.error('could not get movie', err));
};

const removeMovieInWatchlist = (e) => {
  const UserMoveId = e.target.id;
  watchlistData.changeMovieWatchList(UserMoveId, false)
    .then(() => {
      watchlistMovieStringBuilder();
    })
    .catch(err => console.error('error on remove movie from watchlist', err));
};

const showAllMovies = () => {
  const uId = firebase.auth().currentUser.uid;
  movies.movieStringBuilder(uId);
};

const watchlistButtonEvent = () => {
  $('#movies').on('click', '.add-to-watchlist', addMovieToWatchList);
  $('#movies').on('click', '.remove-from-watchlist', removeMovie);
  $('#movies').on('click', '.remove-from-watchlistInWatchlist', removeMovieInWatchlist);
  $('#movies').on('click', '#show-watchlist', watchlistMovieStringBuilder);
  $('#movies').on('click', '#show-all-movies', showAllMovies);
};

export default { watchlistButtonEvent };
