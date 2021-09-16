import api from './api-config'

export const getUsers = async () => {
  console.log(api.url)
  const resp = await api.get(`/users`)
  console.log(resp.data)
  return resp.data
}

export const getUser = async (ID) => {
  const resp = await api.get(`/users/${ID}`)
  console.log(resp.data)
  return resp.data
}