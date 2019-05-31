import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

const movieStringBuilder = (uid) => {
  movieData.getAllMovies(uid)
    .then((movies) => {
      let domstring = '<div class="row justify-content-between mt-5">';
      domstring += '<h1>MOVIES</h1>';
      domstring += '<button type="button" id="addMov" class="btn btn-outline-primary" data-toggle="modal" data-target="#addMovieModal">Add Movie</button>';
      domstring += '</div>';
      domstring += '<div class="row justify-content-around mt-5">';
      movies.forEach((movie) => {
        domstring += '<div class="col-12 col-md-6 col-lg-4">';
        domstring += '<div class="card">';
        domstring += `<img class="card-img-top" src="${movie.imageUrl}" alt="Poster for ${movie.title}">`;
        domstring += '<div class="card-body">';
        domstring += `<h2 class="card-title">${movie.title}</h2>`;
        domstring += `<h6>${movie.releaseDate}</h6>`;
        domstring += `<h6>${movie.mpaaRating}</h6>`;
        if (movie.movieUserId === '') {
          for (let n = 1; n < 6; n += 1) {
            domstring += `<button type="button" value="${n}" id="${movie.id}" class="rateStar far fa-star fa-2x"></button>`;
          }
          domstring += '<div class="watchlistButtonDiv">';
          domstring += '<i class="fas fa-clock fa-2x"></i>';
          domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x add-to-watchlist"></button>`;
          domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x hide remove-from-watchlist"></button>`;
          domstring += '</div>';
        } else if (movie.isOnWatchList) {
          for (let n = 1; n < 6; n += 1) {
            domstring += `<button type="button" value="${n}" id="${movie.id}" class="rateStar far fa-star fa-2x"></button>`;
          }
          domstring += '<div class="watchlistButtonDiv">';
          domstring += '<i class="fas fa-clock fa-2x"></i>';
          domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x hide add-to-watchlist"></button>`;
          domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x remove-from-watchlist"></button>`;
          domstring += '</div>';
        } else if (movie.isWatched) {
          for (let i = 1; i < movie.rating + 1; i += 1) {
            domstring += `<button type="button" value="${i}" id="${movie.id}" class="rateStar fas fa-star fa-2x"></button>`;
          }
          for (let m = movie.rating + 1; m < 6; m += 1) {
            domstring += `<button type="button" value="${m}" id="${movie.id}" class="rateStar far fa-star fa-2x"></button>`;
          }
        }
        // add button clicks events to the $('.rateStar')
        // function checks to see if the movie user item exists
        // if it does and if isWatched is true then checks rating
        // if the new rating is the same then it changes rating to 0 and isWatched to false
        // else it changes the rating and makes sure isWatched is true
        // if it does NOT exist then it creates a new object and sets those values
        domstring += '</div>';
        domstring += '</div>';
        domstring += '</div>';
      });
      domstring += '</div>';
      util.printToDom('movies', domstring);
    }).catch(err => console.error('could not get movie', err));
};

export default { movieStringBuilder };
