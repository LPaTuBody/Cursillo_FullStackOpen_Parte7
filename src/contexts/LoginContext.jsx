import { useReducer, createContext, useContext } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (payload) => ({ type: 'LOGIN', payload })
export const logout = () => ({ type: 'LOGOUT' })

/* -------------------------------------------- */

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
  const [userLoged, loginDispatch] = useReducer(reducer, null)
  return (
    <LoginContext.Provider value={[userLoged, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  )
}

export const useUserLoged = () => {
  const contexto = useContext(LoginContext)
  return contexto[0]
}

export const useLoginDispatch = () => {
  const contexto = useContext(LoginContext)
  return contexto[1]
}

export default LoginContext
