import api from './api-config'

export const getComments = async () => {
  const resp = await api.get(`/comments?&per_page=100`)
  return resp.data
}

export const getCommentsPerPost = async (postID) => {
  const resp = await api.get(`/comments?&post=${postID}`)
  return resp.data
}

export const getComment = async (ID) => {
  const resp = await api.get(`/comments/${ID}`)
  return resp.data
}

export const postComment = async (commentData) => {
  const resp = await api.post(`/comments`, commentData)
  return resp.data
}