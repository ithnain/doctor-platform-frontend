import {
  URL_LOCAL,
  NODE_ENV,
  URL_PROD
} from './env';

let  url;

if (NODE_ENV === 'development') {
  url = URL_LOCAL;
} else {
  url = URL_PROD;
}

export default url;
