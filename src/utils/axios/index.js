import axios from 'axios';

export default axios.create({
    baseURL: `http://157.175.95.127:3003/v1/`,
    timeout: 5000
});
