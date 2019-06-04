import $ from 'jquery';
import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

const showSingleMovieModal = (e) => {
  const movieId = e.target.id.split('.')[1];
  movieData.getSingleMovie(movieId)
    .then((movieToShow) => {
      console.error(movieToShow);
      let domstring = '<div class="modal-header">';
      domstring += '<h5 class="modal-title" id="exampleModalLabel"></h5>';
      domstring += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
      domstring += '<span aria-hidden="true">&times;</span>';
      domstring += '</button>';
      domstring += '</div>';
      domstring += '<div class="modal-body">';
      domstring += '<div class="card mb-3">';
      domstring += '<div class="row no-gutters">';
      domstring += '<div class="col-md-4">';
      domstring += `<img class="card-img" id="single-movie-poster" src="${movieToShow.imageUrl}" alt="Poster for ${movieToShow.title}">`;
      domstring += '</div>';
      domstring += '<div class="col-md-8">';
      domstring += '<div class="card-body">';
      domstring += `<h5 class="card-title">${movieToShow.title}</h5>`;
      domstring += '<p class="card-text">';
      domstring += '<div class="col-auto">';
      domstring += `<h6>${movieToShow.releaseDate}</h6>`;
      domstring += `<h6>${movieToShow.mpaaRating}</h6>`;
      domstring += '</div>';
      domstring += '<div>';
      domstring += `<ul>Director${movieToShow.directors.length > 1 ? 's' : ''}`;
      for (let i = 0; i < movieToShow.directors.length; i += 1) {
        domstring += `<li>${movieToShow.directors[i].firstName} ${movieToShow.directors[i].lastName}</li>`;
      }
      domstring += '</ul>';
      domstring += `<ul>Writer${movieToShow.writers.length > 1 ? 's' : ''}`;
      for (let i = 0; i < movieToShow.writers.length; i += 1) {
        domstring += `<li>${movieToShow.writers[i].firstName} ${movieToShow.writers[i].lastName}</li>`;
      }
      domstring += '</ul>';
      domstring += `<ul>Actor${movieToShow.actors.length > 1 ? 's' : ''}`;
      for (let i = 0; i < movieToShow.actors.length; i += 1) {
        domstring += `<li>${movieToShow.actors[i].firstName} ${movieToShow.actors[i].lastName}</li>`;
      }
      domstring += '</ul>';
      domstring += '</div>';
      domstring += `<h4>Average User Rating: ${movieToShow.rating} Stars</h4>`;
      domstring += '</p>';
      domstring += '</div>';
      domstring += '</div>';
      domstring += '</div>';
      domstring += '</div>';
      domstring += '<div class="modal-footer">';
      domstring += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
      domstring += '</div>';
      util.printToDom('modal-content', domstring);
      $('#singleMovie').modal('show');
    })
    .catch(err => console.error('no single movie modal', err));
};

const events = () => {
  $('#movies').on('click', '.single-movie', showSingleMovieModal);
};

const showMoviesStringBuilder = (movies) => {
  let domstring = '<div class="row justify-content-around mt-5">';
  movies.forEach((movie) => {
    domstring += '<div class="d-flex col-12 col-md-6 col-lg-4 mb-4">';
    domstring += '<div class="card">';
    domstring += '<div class="card-header">';
    domstring += `<h4 class="movie-title">${movie.title}</h4>`;
    domstring += '</div>';
    domstring += `<img class="movie-poster card-img-top" src="${movie.imageUrl}" alt="Poster for ${movie.title}">`;
    domstring += '<div class="card-body">';
    domstring += '<div class="row justify-content-between">';
    domstring += '<div class="col-auto">';
    domstring += `<h6>${movie.releaseDate}</h6>`;
    domstring += `<h6>${movie.mpaaRating}</h6>`;
    domstring += '</div>';
    domstring += '<div class="watchlistButtonDiv col-auto">';
    domstring += `<i id="${movie.movieUserId}" class="fas fa-clock fa-2x"></i>`;
    if (movie.movieUserId === '' || movie.isOnWatchList === false) {
      domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x add-to-watchlist"></button>`;
      domstring += '</div>';
    } else if (movie.isOnWatchList) {
      domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x remove-from-watchlist"></button>`;
      domstring += '</div>';
    }
    domstring += '</div>';
    for (let i = 1; i < movie.rating + 1; i += 1) {
      domstring += `<button type="button" value="${i}" id="${movie.id}" class="rateStar fas fa-star fa-2x"></button>`;
    }
    for (let m = movie.rating + 1; m < 6; m += 1) {
      domstring += `<button type="button" value="${m}" id="${movie.id}" class="rateStar far fa-star fa-2x"></button>`;
    }
    domstring += `<button id=show.${movie.id} class="btn btn-primary col-12 mt-2 single-movie" type="button" aria-expanded="false" aria-controls="collapseExample">`;
    domstring += 'Cast & Crew</button>';
    domstring += '</div>';
    domstring += '</div>';
    domstring += '</div>';
  });
  domstring += '</div>';
  domstring += '<div class="modal fade" id="singleMovie" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
  domstring += '<div class="modal-dialog modal-lg">';
  domstring += '<div id="modal-content" class="modal-content">';
  domstring += '</div>';
  domstring += '</div>';
  domstring += '</div>';
  util.printToDom('moviesDisplay', domstring);
  events();
};

const movieStringBuilder = (uid) => {
  movieData.getAllMovies(uid)
    .then((movies) => {
      const moviesOnWatchlist = movies.filter(movie => movie.isOnWatchList === true);
      const watchlistAmount = moviesOnWatchlist.length;
      let domstring = '<div class="row justify-content-between mt-5">';
      domstring += '<h1>MOVIES</h1>';
      domstring += `<button type="button" id="show-watchlist" class="btn btn-outline-success">Watchlist <span class="badge badge-light">${watchlistAmount}</span></button>`;
      domstring += '<button type="button" id="addMov" class="btn btn-outline-primary" data-toggle="modal" data-target="#addMovieModal">Add Movie</button>';
      domstring += '</div>';
      domstring += '<div id="moviesDisplay" class="container"></div>';
      util.printToDom('movies', domstring);
      showMoviesStringBuilder(movies);
    }).catch(err => console.error('could not get movie', err));
};

export default { movieStringBuilder, showMoviesStringBuilder };
