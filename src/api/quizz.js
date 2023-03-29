import axios from 'axios'
const BASE_URL='https://quizzeo-st-api.onrender.com' //http://localhost:4200 || 3500 ??



export default axios.create({
    baseURL:BASE_URL,
});

export const axiosPrivate=axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type':'application/json'},
    withCredentials: true,
})