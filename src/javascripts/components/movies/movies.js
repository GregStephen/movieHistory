import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';
import watchListButton from '../watchlist/watchlist';

const movieStringBuilder = (uid) => {
  movieData.getAllMovies(uid)
    .then((movies) => {
      console.error('movies', movies);
      let domstring = '<div class="row justify-content-around">';
      domstring += '<h1 class="col-12">MOVIES</h1>';
      movies.forEach((movie) => {
        domstring += '<div class="col-12 col-lg-4">';
        domstring += '<div class="card">';
        domstring += `<img class="card-img-top" src="${movie.imageUrl}" alt="Poster for ${movie.title}">`;
        domstring += '<div class="card-body">';
        domstring += `<h2 class="card-title">${movie.title}</h2>`;
        domstring += `<h6>${movie.releaseDate}</h6>`;
        domstring += `<h6>${movie.mpaaRating}</h6>`;
        domstring += '<h6>Rating:</h6>';
        domstring += '<a href="#" class="btn btn-primary">Rate</a>';
        domstring += '<div class="watchlistButtonDiv">';
        domstring += '<i class="fas fa-clock fa-2x"></i>';
        domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x add-to-watchlist"></button>`;
        domstring += `<button id="${movie.userMovieId}"class="fas fa-check fa-2x hide remove-from-watchlist"></button>`;
        domstring += '</div>';
        domstring += '</div>';
        domstring += '</div>';
        domstring += '</div>';
      });
      domstring += '</div>';
      util.printToDom('movies', domstring);
      watchListButton.addMovieToWatchlistButtonEvent();
    }).catch(err => console.error('could not get movie', err));
};

export default { movieStringBuilder };
