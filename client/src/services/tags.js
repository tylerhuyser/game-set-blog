import api from './api-config'

export const getTags = async () => {
  const resp = await api.get(`/tags`)
  return resp.data
}

export const getTag = async (ID) => {
  const resp = await api.get(`/tags/${ID}`)
  return resp.data
}