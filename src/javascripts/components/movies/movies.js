import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

const movieStringBuilder = () => {
  movieData.getAllMovies()
    .then((movies) => {
      let domstring = '<h1>MOVIES</h1>';
      movies.forEach((movie) => {
        domstring += `<h2>${movie.title}</h2>`;
        domstring += `<img src="${movie.imageUrl}" alt="Poster for ${movie.title}">`;
        domstring += `<h6>${movie.releaseDate}</h6>`;
        domstring += `<h6>${movie.mpaaRating}</h6>`;
      });
      util.printToDom('movies', domstring);
    }).catch(err => console.error('could not get movie', err));
};

export default { movieStringBuilder };
