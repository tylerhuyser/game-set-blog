import api from './api-config'

export const getCategories = async () => {
  console.log(api.url)
  const resp = await api.get(`/categories`)
  console.log(resp.data)
  return resp.data
}

export const getCategory = async (ID) => {
  const resp = await api.get(`/categories/${ID}`)
  console.log(resp.data)
  return resp.data
}