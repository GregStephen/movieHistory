import util from '../../helpers/util';

const movieStringBuilder = () => {
  let domstring = '';
  domstring += '<h2>MOVIES</h2>';
  util.printToDom('movies', domstring);
};

export default { movieStringBuilder };
