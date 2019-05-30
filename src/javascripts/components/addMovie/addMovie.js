import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import axios from 'axios';
import movieData from '../../helpers/data/movieData';
import movies from '../movies/movies';
import apiKeys from '../../helpers/apiKeys.json';
import util from '../../helpers/util';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);

const addMovieModalRatingBuilder = () => {
  axios.get(`${firebaseUrl}/mpaaRatings.json`)
    .then((mpaaResults) => {
      const ratingResults = mpaaResults.data;
      let ratingValues = [];
      ratingValues = Object.values(ratingResults);
      let domString = '';
      domString += '<div>';
      // domString += '<option selected>Rating</option>';
      for (let i = 0; i < ratingValues.length; i += 1) {
        domString += `<option>${ratingValues[i]}</option>`;
      }
      util.printToDom('inputMpaaRating', domString);
    }).catch(err => console.error('Mpaa rating builder', err));
};

const addMovieToDatabase = () => {
  addMovieModalRatingBuilder();
  const mpaaRating = $('#inputMpaaRating')[0].value;
  const uId = firebase.auth().currentUser.uid;
  axios.get(`${firebaseUrl}/mpaaRatings.json`)
    .then((mpaaResults) => {
      const ratingResults = mpaaResults.data;
      const ratingId = getKeyByValue(ratingResults, mpaaRating);
      const newMovieObject = {
        imageUrl: $('#inputMoviePoster')[0].value,
        mpaaId: ratingId,
        releaseDate: $('#inputReleaseDate')[0].value,
        title: $('#inputMovieTitle')[0].value,
      };
      movieData.addNewMovieToDatabase(newMovieObject)
        .then(() => {
          movies.movieStringBuilder(uId);
        })
        .catch(err => console.error('no new movie', err));
    });
};

const addMovieButtonEvent = () => {
  $('#add-movie-button').on('click', () => {
    if ($('#addMovieForm').valid()) {
      addMovieToDatabase();
    }
  });
  $('#movies').on('click', '#addMov', addMovieModalRatingBuilder);
};

export default { addMovieButtonEvent };
