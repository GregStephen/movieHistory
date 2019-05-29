import firebase from 'firebase/app';
import 'firebase/auth';
import movies from '../../components/movies/movies';

const moviesDiv = document.getElementById('movies');
const authDiv = document.getElementById('auth');
const moviesNavbar = document.getElementById('navbar-button-movies');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      moviesDiv.classList.remove('hide');
      moviesNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      movies.movieStringBuilder(user.uid);
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
