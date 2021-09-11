import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? `https://www.gameset.blog/wp-json/wp/v2` : 'https://www.gameset.blog/wp-json/wp/v2'

const api = axios.create({
  url: baseUrl
})

export default api;