import api from './api-config'

export const getPosts = async (page) => {
  const resp = await api.get(`/posts?_embed&page=${page}&per_page=5`)
  return resp
}

export const getPost = async (ID) => {
  const resp = await api.get(`/posts/${ID}?_embed`)
  return resp.data
}

export const getPostBySlug = async (slug) => {
  const resp = await api.get(`/posts?slug=${slug}&_embed`)
  return resp.data[0]
}