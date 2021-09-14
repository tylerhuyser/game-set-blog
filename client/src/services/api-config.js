import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? `https://www.gamesetblog.com/wp-json/wp/v2` : 'https://www.gamesetblog.com/wp-json/wp/v2'

const api = axios.create({
  url: baseUrl
})

export default api;