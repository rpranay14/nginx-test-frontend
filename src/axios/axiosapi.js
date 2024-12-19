import axios from 'axios';

export const axiosapi=axios.create({
    baseURL:"http://localhost:3001"
})
export const axiosPrivate=axios.create({
    baseURL:"http://localhost:3001",
    withCredentials:true,
    headers:{"Content-Type":"application/json"}
})