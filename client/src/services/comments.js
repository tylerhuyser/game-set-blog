import api from './api-config'

export const getComments = async () => {
  const resp = await api.get(`/comments?&per_page=100`)
  console.log(resp.data)
  return resp.data
}

export const getCommentsPerPost = async (postID) => {
  const resp = await api.get(`/comments?&post=${postID}`)
  console.log(resp.data)
  return resp.data
}

export const getComment = async (ID) => {
  const resp = await api.get(`/comments/${ID}`)
  console.log(resp.data)
  return resp.data
}

export const postComment = async (commentData) => {
  const resp = await api.post(`/comments`, {commment: commentData})
  console.log(resp.data)
  return resp.data
}