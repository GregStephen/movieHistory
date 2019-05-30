import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMovies = uid => new Promise((resolve, reject) => {
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
          axios.get(`${firebaseUrl}/movieUser.json`)
            .then((movieUserResults) => {
              const movieUserRes = movieUserResults.data;
              const mUserResArray = [];
              Object.keys(movieUserRes).forEach((movieUserId) => {
                movieUserRes[movieUserId].id = movieUserId;
                mUserResArray.push(movieUserRes[movieUserId]);
              });
              const newMovieArray = [];
              movies.forEach((movie) => {
                const newMovie = movie;
                const mM = mUserResArray.filter(mov => mov.movieId === movie.id && mov.uid === uid);
                newMovie.movieUserId = mM[0] ? mM[0].id : '';
                newMovieArray.push(newMovie);
              });
              resolve(newMovieArray);
            });
        });
    })
    .catch(err => reject(err));
});

const addNewMovieToDatabase = movieObject => axios.post(`${firebaseUrl}/movies.json`, movieObject);

export default { getAllMovies, addNewMovieToDatabase };
