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
          for (let n = 0; n < 5; n += 1) {
            domstring += `<a id="${n}" class="rateStar far fa-star fa-2x"></a>`;
          }
          domstring += '<div class="watchlistButtonDiv">';
          domstring += '<i class="fas fa-clock fa-2x"></i>';
          domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x add-to-watchlist"></button>`;
          domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x hide remove-from-watchlist"></button>`;
        } else if (movie.isOnWatchList) {
          for (let n = 0; n < 5; n += 1) {
            domstring += `<a id="${n}" class="rateStar far fa-star fa-2x"></a>`;
          }
          domstring += '<div class="watchlistButtonDiv">';
          domstring += '<i class="fas fa-clock fa-2x"></i>';
          domstring += `<button id="${movie.id}"class="fas fa-plus fa-2x hide add-to-watchlist"></button>`;
          domstring += `<button id="${movie.movieUserId}"class="fas fa-check fa-2x remove-from-watchlist"></button>`;
        } else if (movie.isWatched) {
          for (let i = 0; i < movie.rating; i += 1) {
            domstring += `<a id="${i}" class="rateStar fas fa-star fa-2x"></a>`;
          }
          for (let m = movie.rating; m < 5; m += 1) {
            domstring += `<a id="${m}" class="rateStar far fa-star fa-2x"></a>`;
          }
        }
        // if movie.isWatched = true then for loop
        // i = 0; i < movie.rating; i += 1
        // make full stars
        // for loop i = movie.rating; i < 5; i += 1
        // make empty stars
        // give all the stars a class of "rateStar" and an idea of [i]
        // else then loop i =0; i < 5; i += 1
        // make empty stars
        // do the watchlist loop
        // add button clicks events to the $('.rateStar')
        // function checks to see if the movie user item exists
        // if it does and if isWatched is true then checks rating
        // if the new rating is the same then it changes rating to 0 and isWatched to false
        // else it changes the rating and makes sure isWatched is true
        // if it does NOT exist then it creates a new object and sets those values
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
