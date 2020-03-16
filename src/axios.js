import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-fitnesso.firebaseio.com'
});

export default instance;