import axios from 'axios';

const isProduction = import.meta.env.MODE === 'production';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (isProduction ? '/api' : 'http://localhost:5001/api'),
});

export default api;
