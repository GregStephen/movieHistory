import firebase from 'firebase/app';
import 'firebase/auth';
// import Axios from 'axios';
// import $ from 'jquery';
// import apiKeys from '../apiKeys.json';

import movies from '../../components/movies/movies';
import watchListButton from '../../components/watchlist/watchlist';
import addMovieButton from '../../components/addMovie/addMovie';
import rateMovieButtons from '../../components/rateMovie/rateMovie';

// const firebaseUrl = apiKeys.firebaseKeys.databaseURL;
const moviesDiv = document.getElementById('movies');
const authDiv = document.getElementById('auth');
const moviesNavbar = document.getElementById('navbar-button-movies');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Axios.get(`${firebaseUrl}/user.json?orderBy="uid"&equalTo="${user.uid}"`)
      //   .then((resp) => {
      //     if (Object.entries(resp.data).length === 0 && resp.data.constructor === Object) {
      //       const newUser = {
      //         uid: user.uid,
      //         avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      //         name: 'New User',
      //       };
      //       Axios.post(`${firebaseUrl}/user.json`, newUser);
      //       $('#newUserModal').modal('show');
      //     }
      //   }).catch(err => console.error('new user error', err));
      authDiv.classList.add('hide');
      moviesDiv.classList.remove('hide');
      moviesNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      movies.movieStringBuilder(user.uid);
      watchListButton.watchlistButtonEvent();
      addMovieButton.addMovieButtonEvent();
      rateMovieButtons.rateMovieEventHandler();
    } else {
      authDiv.classList.remove('hide');
      moviesDiv.classList.add('hide');
      moviesNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
