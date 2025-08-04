import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => axios.get(baseUrl).then((resp) => resp.data)

export default { getAll }
