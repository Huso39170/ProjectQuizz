import axios from 'axios'
const BASE_URL='https://quizzeo-api.onrender.com:10000'



export default axios.create({
    baseURL:BASE_URL
});

export const axiosPrivate=axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type':'application/json'},
    withCredentials: true
})