import api from './api-config'

export const getTags = async () => {
  const resp = await api.get(`/tags`)
  console.log(resp.data)
  return resp.data
}

export const getTags = async (ID) => {
  const resp = await api.get(`/tags/${ID}`)
  console.log(resp.data)
  return resp.data
}