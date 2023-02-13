import axios from 'axios'

export default axios.create({
    baseURL:'http://localhost:3500',
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJlbWFpbCI6InNlZmZhcmFtYXlhczMwQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpZCI6IjYzY2RiOTI5MDM3ZGI3ZGUwMjJiYWQ5MyJ9LCJpYXQiOjE2NzQ0MjgyOTUsImV4cCI6MTY3NjE1NjI5NX0.DqoFAvN6KxBaem4ziOX1zRTc9_ryaAuoVVmnynkdebM' }
})