import api from './api-config.js'

export const getPosts = async (sourceID, page) => {
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

export const getPostsByCategory = async (categoryID, page) => {
  const resp = await api.get(`/posts?categories=${categoryID}&_embed&page=${page}&per_page=5`)
  return resp
}

export const getPostsByTag = async (tagID, page) => {
  const resp = await api.get(`/posts?tags=${tagID}&_embed&page=${page}&per_page=5`)
  return resp
}