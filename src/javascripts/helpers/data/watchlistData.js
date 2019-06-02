import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewMovieToUserMovieList = movieObject => axios.post(`${firebaseUrl}/movieUser.json`, movieObject);
const removeMovieFromWatchList = userMovieId => axios.delete(`${firebaseUrl}/movieUser/${userMovieId}.json`);
const editMovieOnUserMovieList = (userMovieId, newObj) => axios.put(`${firebaseUrl}/movieUser/${userMovieId}.json`, newObj);
const changeMovieRating = (userMovieId, newRating) => axios.patch(`${firebaseUrl}/movieUser/${userMovieId}.json`, { rating: newRating });
const changeIsWatchedStatus = (userMovieId, newStatus) => axios.patch(`${firebaseUrl}/movieUser/${userMovieId}.json`, { isWatched: newStatus });
export default {
  addNewMovieToUserMovieList,
  removeMovieFromWatchList,
  editMovieOnUserMovieList,
  changeMovieRating,
  changeIsWatchedStatus,
};
