import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => axios.get(`${baseUrl}/all`).then(resp => resp.data) 

const getCountry = async (ctryName) => {
  const resp = await axios.get(`${baseUrl}/name/${ctryName}`)
  return resp.data
}

export default { getAll, getCountry }