import { useReducer, createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SETEAR':
      return action.payload
    default:
      return state
  }
}

export const setUsers = (payload) => ({ type: 'SETEAR', payload })

/* -------------------------------------------- */

const UsersContext = createContext()

export const UsersContextProvider = (props) => {
  const [users, usersDispatch] = useReducer(reducer, [])
  return (
    <UsersContext.Provider value={[users, usersDispatch]}>
      {props.children}
    </UsersContext.Provider>
  )
}

export const useUsersValue = () => {
  const contexto = useContext(UsersContext)
  return contexto[0]
}

export const useUsersDispatch = () => {
  const contexto = useContext(UsersContext)
  return contexto[1]
}

export default UsersContext

/* -------------------------------------------- */

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 2,
    throwOnError: (err) => console.log('Error fetching users:', err),
  })
}
