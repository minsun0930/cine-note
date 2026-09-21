import axios from "axios"


//axios instance 생성
const api = axios.create({
  baseURL : "https://api.themoviedb.org/3",
  params : {
    api_Key : import.meta.env.VITE_TMDB_API_KEY,
    language:"ko-KR",
  }
})

export default api;