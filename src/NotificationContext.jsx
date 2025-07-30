import { useReducer, createContext, useContext } from "react"

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTI': return action.payload
    case 'RM_NOTI': return null
    default: return state
  }
}

export const setNoti = (payload) => ({ type: 'SET_NOTI', payload })
export const rmNoti = () => ({ type: 'RM_NOTI' })

const NotiContext = createContext()

export const NotiContextProvider = (props) => {
  const [notification, dispatch] = useReducer(NotificationReducer, null)
  return (
    <NotiContext.Provider value={[notification, dispatch]} >
      {props.children}
    </NotiContext.Provider>
  )
}

export const useNotiDispatch = () => {
  const contexto = useContext(NotiContext)
  return contexto[1]
}

export default NotiContext