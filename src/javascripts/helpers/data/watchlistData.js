import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewMovieToUserMovieList = movieObject => axios.post(`${firebaseUrl}/movieUser.json`, movieObject);
const removeMovieFromWatchList = userMovieId => axios.delete(`${firebaseUrl}/movieUser/${userMovieId}.json`);
const editMovieOnUserMovieList = (userMovieId, newObj) => axios.put(`${firebaseUrl}/movieUser/${userMovieId}.json`, newObj);
const changeMovieRating = (userMovieId, newRating) => axios.patch(`${firebaseUrl}/movieUser/${userMovieId}.json`, { rating: newRating });
const changeIsWatchedStatus = (userMovieId, newStatus) => axios.patch(`${firebaseUrl}/movieUser/${userMovieId}.json`, { isWatched: newStatus });

const showOnlyWatchlist = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movieUser.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const movieUserResults = results.data;
      const movieUsers = [];
      Object.keys(movieUserResults).forEach((movieUserId) => {
        movieUserResults[movieUserId].movieUserid = movieUserId;
        movieUsers.push(movieUserResults[movieUserId]);
      });
      console.error('movieUsers', movieUsers);
      resolve(movieUsers);
    }).catch(err => reject(err));
});

export default {
  addNewMovieToUserMovieList,
  removeMovieFromWatchList,
  editMovieOnUserMovieList,
  changeMovieRating,
  changeIsWatchedStatus,
  showOnlyWatchlist,
};
