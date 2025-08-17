import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => token = `Bearer ${newToken}`

const getAll = () => axios.get(baseUrl).then((resp) => resp.data)

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const resp = await axios.post(baseUrl, newObject, config)
  return resp.data
}

const update = async (id, newObject) => {
  const resp = axios.put(`${baseUrl}/${id}`, newObject)
  return resp.data
}

const dilit = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const resp = await axios.delete(`${baseUrl}/${id}`, config)
  return resp.data
}

export default { getAll, create, update, dilit, setToken }
