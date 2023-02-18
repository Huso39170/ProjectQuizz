import axios from 'axios'
const BASE_URL='http://localhost:3500'



export default axios.create({
    baseURL:BASE_URL,
    //headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJlbWFpbCI6InNlZmZhcmFtYXlhczMwQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpZCI6IjYzZDkwZTkwYjVhN2MxZTM4NWYyNzliYyJ9LCJpYXQiOjE2NzUxNzM0NDAsImV4cCI6MTY3NjkwMTQ0MH0.mVg_Y5j5eR0NMpmNimlNxEG04i9m8aO7p51KhfTz8do'}
});

export const axiosPrivate=axios.create({
    baseURL:BASE_URL,
    headers:{'Content-Type':'application/json'},
    withCredentials: true
})