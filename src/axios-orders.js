import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://shaurya-burger-builder.firebaseio.com/',
    params : {
        key: 'AIzaSyDamQgVDeQSQw9Fq5WA2URv9tFbTSXdaJo'
    }
});

export default instance;
