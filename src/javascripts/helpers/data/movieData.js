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
          axios.get(`${firebaseUrl}/movieUser.json?orderBy="uid"&equalTo="${uid}"`)
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
                const mM = mUserResArray.filter(mov => mov.movieId === movie.id);
                newMovie.movieUserId = mM[0] ? mM[0].id : '';
                newMovie.isOnWatchList = mM[0] ? mM[0].isOnWatchList : false;
                newMovie.isWatched = mM[0] ? mM[0].isWatched : false;
                newMovie.rating = mM[0] ? mM[0].rating : '';
                newMovieArray.push(newMovie);
              });
              resolve(newMovieArray);
            });
        });
    })
    .catch(err => reject(err));
});

const getSingleMovie = movieIdToFind => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movies.json`)
    .then((movieResult) => {
      const moviesToShowArray = movieResult.data;
      const moviesToFind = [];
      Object.keys(moviesToShowArray).forEach((movieId) => {
        moviesToShowArray[movieId].id = movieId;
        moviesToFind.push(moviesToShowArray[movieId]);
      });
      const movieToShow = moviesToFind.find(movie => movie.id === movieIdToFind);
      axios.get(`${firebaseUrl}/mpaaRatings.json`)
        .then((mpaaResults) => {
          const ratingResults = mpaaResults.data;
          movieToShow.mpaaRating = ratingResults[movieToShow.mpaaId];
          axios.get(`${firebaseUrl}/moviePeopleRoles.json?orderBy="movieId"&equalTo="${movieIdToFind}"`)
            .then((mPRResults) => {
              const MPRresults = mPRResults.data;
              const mPrRes = [];
              Object.keys(MPRresults).forEach((mPRId) => {
                MPRresults[mPRId].id = mPRId;
                mPrRes.push(MPRresults[mPRId]);
              });
              axios.get(`${firebaseUrl}/people.json`)
                .then((people) => {
                  const peopleResults = people.data;
                  const peopleArray = [];
                  Object.keys(peopleResults).forEach((personId) => {
                    peopleResults[personId].id = personId;
                    peopleArray.push(peopleResults[personId]);
                  });
                  const namedPeopleInRoles = [];
                  mPrRes.forEach((person) => {
                    const personToName = person;
                    const persToFil = peopleArray.filter(per => per.id === person.personId);
                    personToName.firstName = persToFil[0].firstName;
                    personToName.lastName = persToFil[0].lastName;
                    namedPeopleInRoles.push(personToName);
                  });
                  const directors = mPrRes.filter(role => role.roleId === 'role1');
                  const writers = mPrRes.filter(role => role.roleId === 'role2');
                  const actors = mPrRes.filter(role => role.roleId === 'role3');
                  movieToShow.directors = directors;
                  movieToShow.actors = actors;
                  movieToShow.writers = writers;
                  axios.get(`${firebaseUrl}/movieUser.json?orderBy="movieId"&equalTo="${movieIdToFind}"`)
                    .then((ratings) => {
                      const rating = ratings.data;
                      const ratingArray = [];
                      Object.keys(rating).forEach((mUId) => {
                        rating[mUId].id = mUId;
                        ratingArray.push(rating[mUId]);
                      });
                      let totalRating = 0;
                      ratingArray.forEach((ratingToAdd) => {
                        totalRating += ratingToAdd.rating;
                      });
                      movieToShow.rating = (totalRating / ratingArray.length).toFixed(1);
                      console.error(movieToShow);
                      resolve(movieToShow);
                    });
                });
            });
        });
    })
    .catch(err => reject(err));
});

const addNewMovieToDatabase = movieObject => axios.post(`${firebaseUrl}/movies.json`, movieObject);

export default {
  getAllMovies,
  addNewMovieToDatabase,
  getSingleMovie,
};
