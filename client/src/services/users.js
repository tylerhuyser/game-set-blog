import api from './api-config'

export const getUsers = async () => {
  const resp = await api.get(`/users`)
  return resp.data
}

export const getUser = async (ID) => {
  const resp = await api.get(`/users/${ID}`)
  return resp.data
}