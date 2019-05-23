import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';
import googleImage from './googlebutton.png';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const authStringBuilder = () => {
  let domstring = '<button id="google-auth" class="btn btn-danger">';
  domstring += `<img src=${googleImage} />`;
  domstring += '</button>';
  util.printToDom('auth', domstring);
  document.getElementById('google-auth').addEventListener('click', signMeIn);
};

export default { authStringBuilder };
