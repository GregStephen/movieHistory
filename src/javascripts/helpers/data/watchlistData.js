import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewMovieToUserMovieList = movieObject => axios.post(`${firebaseUrl}/movieUser.json`, movieObject);
const removeMovieFromWatchList = userMovieId => axios.delete(`${firebaseUrl}/movieUser/${userMovieId}.json`);

export default { addNewMovieToUserMovieList, removeMovieFromWatchList };
