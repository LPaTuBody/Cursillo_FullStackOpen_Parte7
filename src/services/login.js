import axios from 'axios'
const baseUrl = '/api/login'

const getToken = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const resp = await axios.get(baseUrl, config)
  return resp.data
}

const login = async (credentials) => {
  const resp = await axios.post(baseUrl, credentials)
  return resp.data
}

export default { login, getToken }
