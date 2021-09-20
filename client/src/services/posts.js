import api from './api-config'

export const getPosts = async () => {
  const resp = await api.get(`/posts?per_page=100?_embed`)
  console.log(resp.data)
  return resp.data
}

export const getPost = async (ID) => {
  const resp = await api.get(`/posts/${ID}`)
  console.log(resp.data)
  return resp.data
}