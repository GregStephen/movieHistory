import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

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
      domstring += '<div class="row justify-content-around mt-5">';
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
        if (movie.movieUserId === '') {
          domstring += '<div class="watchlistButtonDiv col-auto">';
          domstring += '<i class="fas fa-clock fa-2x"></i>';
          domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x add-to-watchlist"></button>`;
          domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x hide remove-from-watchlist"></button>`;
          domstring += '</div>';
          domstring += '</div>';
          for (let n = 1; n < 6; n += 1) {
            domstring += `<button type="button" value="${n}" id="${movie.id}" class="rateStar far fa-star fa-2x"></button>`;
          }
        } else if (movie.isWatched) {
          domstring += '</div>';
          for (let i = 1; i < movie.rating + 1; i += 1) {
            domstring += `<button type="button" value="${i}" id="${movie.id}" class="rateStar fas fa-star fa-2x"></button>`;
          }
          for (let m = movie.rating + 1; m < 6; m += 1) {
            domstring += `<button type="button" value="${m}" id="${movie.id}" class="rateStar far fa-star fa-2x"></button>`;
          }
        } else if (movie.isOnWatchList) {
          domstring += '<div class="watchlistButtonDiv col-auto">';
          domstring += '<i class="fas fa-clock fa-2x"></i>';
          domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x hide add-to-watchlist"></button>`;
          domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x remove-from-watchlist"></button>`;
          domstring += '</div>';
          domstring += '</div>';
          for (let n = 1; n < 6; n += 1) {
            domstring += `<button type="button" value="${n}" id="${movie.id}" class="rateStar far fa-star fa-2x"></button>`;
          }
        }
        domstring += '</div>';
        domstring += '</div>';
        domstring += '</div>';
      });
      domstring += '</div>';
      util.printToDom('movies', domstring);
    }).catch(err => console.error('could not get movie', err));
};

export default { movieStringBuilder };
