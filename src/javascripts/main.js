import firebase from 'firebase/app';
import 'bootstrap';
import '../styles/main.scss';
import myNavbar from './components/myNavbar/myNavbar';
import auth from './components/auth/auth';
import movies from './components/movies/movies';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  myNavbar.navbarEvents();
  authData.checkLoginStatus();
  auth.authStringBuilder();
  movies.movieStringBuilder();
};

init();
