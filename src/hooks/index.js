import { useState, useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => setValue(e.target.value)

  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then(({ data }) => setResources(data))
      .catch(err => console.log('Error getting resources: ', err))
  }, [])

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(({ data }) => setResources(resources.concat(data)))
      .catch(err => console.log('Error creating resource: ', err))
  }

  const update = (resource) => {
    axios.put(`${baseUrl}/${resource.id}`, resource)
      .then(({ data }) => setResources(resources.map(r => r.id === data.id ? data : r)))
      .catch(err => console.log('Error updating resource: ', err))
  }

  const service = {
    create, update
  }

  return [
    resources, service
  ]
}