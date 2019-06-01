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
  console.error('movie rated:', newRating, 'movId', movieId, 'uId', uId);
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
          })
          .catch(err => console.error('error on add movie to watchlist', err));
      } else if (ratedMovie.isWatched === true) {
        if (ratedMovie.rating === newRating) {
          if (ratedMovie.isOnWatchList === true) {
            console.error('is on watchlist and ratings are the same');
            // changes the ratedMovie.rating to 0
            // changes ratedMovie.isWatched to False
          } else {
            console.error('is not on watchlist and ratings are the same');
            // deletes from usermovie list
          }
        } else {
          console.error('may or may not be on watchlist and rating is a new rating');
          // changes the ratedMovie.rating to the new rating
        }
      } else if (ratedMovie.isWatched === false) {
        console.error('newly rated movie but on watchlist already');
        // changes the ratedMovie.rating to new rating
        // changes ratedMovie.isWatched to True
      }
    })
    .catch(err => console.error('error on rating movie', err));
  // watchlistData.rateMovie(movieId)
  //   .then(() => {
  //     movies.movieStringBuilder(uId);
  //   })
  //   .catch(err => console.error('cant rate movie', err));
};

const rateMovieEventHandler = () => {
  $('#movies').on('click', '.rateStar', addOrEditMovieRating);
};

export default { rateMovieEventHandler };
