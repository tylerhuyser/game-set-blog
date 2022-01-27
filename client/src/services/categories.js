import api from './api-config'

export const getCategories = async () => {
  const resp = await api.get(`/categories`)
  return resp.data
}

export const getCategory = async (ID) => {
  const resp = await api.get(`/categories/${ID}`)
  return resp.data
}