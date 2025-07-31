import { useContext } from 'react'
import NotiContext, { rmNoti } from '../NotificationContext'

const Notification = () => {
  const [notification, dispatch] = useContext(NotiContext)

  const style = {
    backgroundColor: 'white',
    border: '1px solid rgb(65, 65, 65)',
    borderRadius: '5px',
    padding: '10px 15px',
    position: 'absolute',
    top: '40px',
    left: '5%',
    width: '90%',
  }

  if (!notification) return null
  else setTimeout(() => { dispatch(rmNoti()) }, 5000)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification