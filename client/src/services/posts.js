import api from './api-config'

export const getPosts = async (page) => {
  const resp = await api.get(`/posts?_embed&page=${page}&per_page=5`)
  console.log(resp)
  console.log(resp.data)
  return resp
}

export const getPost = async (ID) => {
  const resp = await api.get(`/posts/${ID}`)
  console.log(resp.data)
  return resp.data
}