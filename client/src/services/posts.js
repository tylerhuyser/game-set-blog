import api from './api-config'

export const getPosts = async () => {
  const resp = await api.get(`/posts`)
  console.log(resp.data)
  return resp.data
}

export const getPost = async (ID) => {
  const resp = await api.get(`/posts/${ID}`)
  console.log(resp.data)
  return resp.data
}