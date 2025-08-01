import { useState, useEffect } from 'react'
import ctryService from '../services/countries'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => setValue(e.target.value)

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      ctryService
        .getCountry(name)
        .then(resp => {
          console.log(resp)
          setCountry({ data: resp, found: true })
        })
        .catch(err => {
          console.log('Error in useCountry: ', err)
          setCountry({ data: null, found: false })
        })
    }
  }, [name])

  return country
}