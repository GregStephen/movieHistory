import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import $ from 'jquery';
import watchlistData from '../../helpers/data/watchlistData';
import movies from '../movies/movies';

import apiKeys from '../../helpers/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

// import watchlistData from '../../helpers/data/watchlistData';
// import movies from '../movies/movies';

const addOrEditMovieRating = (e) => {
  const uId = firebase.auth().currentUser.uid;
  const newRating = parseInt(e.target.value, 10);
  const movieId = e.target.id;
  axios.get(`${firebaseUrl}/movieUser.json?orderBy="uid"&equalTo="${uId}"`)
    .then((ratingMovieResults) => {
      const ratedMovieRes = ratingMovieResults.data;
      const ratedMovieArray = [];
      Object.keys(ratedMovieRes).forEach((movieUserId) => {
        ratedMovieRes[movieUserId].id = movieUserId;
        ratedMovieArray.push(ratedMovieRes[movieUserId]);
      });
      const ratedMovie = ratedMovieArray.find(mov => mov.movieId === movieId);
      if (typeof ratedMovie === 'undefined') {
        const newMovie = {
          isOnWatchList: false,
          isWatched: true,
          uid: uId,
          rating: newRating,
          movieId,
        };
        watchlistData.addNewMovieToUserMovieList(newMovie)
          .then(() => {
            movies.movieStringBuilder(uId);
          });
      } else if (ratedMovie.isWatched === true) {
        if (ratedMovie.rating === newRating) {
          if (ratedMovie.isOnWatchList === true) {
            // is on watchlist and ratings are the same
            const newStatus = false;
            const zeroRating = '';
            watchlistData.changeIsWatchedStatus(ratedMovie.id, newStatus).then(() => {
              watchlistData.changeMovieRating(ratedMovie.id, zeroRating).then(() => {
                movies.movieStringBuilder(uId);
              });
            });
          } else {
          // deletes from usermovie list
            watchlistData.removeMovieFromWatchList(ratedMovie.id)
              .then(() => {
                movies.movieStringBuilder(uId);
              });
          }
        } else {
          // changes the ratedMovie.rating to the new rating
          watchlistData.changeMovieRating(ratedMovie.id, newRating).then(() => {
            movies.movieStringBuilder(uId);
          });
        }
      } else if (ratedMovie.isWatched === false) {
        // changes the ratedMovie.rating to new rating
        // changes ratedMovie.isWatched to True
        const newStatus = true;
        watchlistData.changeIsWatchedStatus(ratedMovie.id, newStatus).then(() => {
          watchlistData.changeMovieRating(ratedMovie.id, newRating).then(() => {
            movies.movieStringBuilder(uId);
          });
        });
      }
    })
    .catch(err => console.error('error on rating movie', err));
};

const rateMovieEventHandler = () => {
  $('#movies').on('click', '.rateStar', addOrEditMovieRating);
};

export default { rateMovieEventHandler };
