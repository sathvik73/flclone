import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api', // Port 5001 for Amazon
});

export default api;
