import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

const movieStringBuilder = (uid) => {
  movieData.getAllMovies(uid)
    .then((movies) => {
      console.error('movies', movies);
      let domstring = '<div class="row justify-content-around">';
      domstring += '<h1 class="col-12">MOVIES</h1>';
      movies.forEach((movie) => {
        domstring += '<div class="col-12 col-md-6 col-lg-4">';
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
        if (`${movie.movieUserId}` === '') {
          domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x add-to-watchlist"></button>`;
          domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x hide remove-from-watchlist"></button>`;
        } else {
          domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x hide add-to-watchlist"></button>`;
          domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x remove-from-watchlist"></button>`;
        }
        domstring += '</div>';
        domstring += '</div>';
        domstring += '</div>';
        domstring += '</div>';
      });
      domstring += '</div>';
      util.printToDom('movies', domstring);
    }).catch(err => console.error('could not get movie', err));
};

export default { movieStringBuilder };
