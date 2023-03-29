import axios from 'axios'
const BASE_URL='http://localhost:3500' //https://quizzeo-st-api.onrender.com



export default axios.create({
    baseURL:BASE_URL,
});

export const axiosPrivate=axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type':'application/json'},
    withCredentials: true,
})