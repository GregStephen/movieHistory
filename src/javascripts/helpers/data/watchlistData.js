import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewMovieToUserMovieList = movieObject => axios.post(`${firebaseUrl}/movieUser.json`, movieObject);
const removeMovieFromWatchList = userMovieId => axios.delete(`${firebaseUrl}/movieUser/${userMovieId}.json`);
const editMovieOnUserMovieList = (userMovieId, newObj) => axios.put(`${firebaseUrl}/movieUser/${userMovieId}.json`, newObj);
const changeMovieRating = (userMovieId, rating) => axios.patch(`${firebaseUrl}/movieUser/${userMovieId}/rating.json`, rating);

export default {
  addNewMovieToUserMovieList,
  removeMovieFromWatchList,
  editMovieOnUserMovieList,
  changeMovieRating,
};
