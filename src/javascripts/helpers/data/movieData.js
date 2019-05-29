import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMovies = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movies.json`)
    .then((results) => {
      const movieResults = results.data;
      const movies = [];
      Object.keys(movieResults).forEach((movieId) => {
        movieResults[movieId].id = movieId;
        movies.push(movieResults[movieId]);
      });
      axios.get(`${firebaseUrl}/mpaaRatings.json`)
        .then((mpaaResults) => {
          const ratingResults = mpaaResults.data;
          for (let i = 0; i < movies.length; i += 1) {
            movies[i].mpaaRating = ratingResults[movies[i].mpaaId];
          }
          resolve(movies);
        });
    })
    .catch(err => reject(err));
});

export default { getAllMovies };
