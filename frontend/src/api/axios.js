import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';  // Adjust if your backend URL is different

export default axios.create({
    baseURL: BASE_URL,
});
