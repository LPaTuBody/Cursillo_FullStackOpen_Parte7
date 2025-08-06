import { useContext } from 'react'
import NotiContext, { rmNoti } from '../contexts/NotiContext'

const Notification = () => {
  const [[message, type], dispatch] = useContext(NotiContext)

  if (!message) return null

  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda',
    padding: '10px',
    borderRadius: '5px',
    position: 'fixed',
    top: '30px',
    left: '5%',
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
  }

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: type === 'error' ? 'red' : 'green',
    cursor: 'pointer',
    marginLeft: '12px',
    fontSize: '0.9em',
  }

  return (
    <div id="notification_div" style={notificationStyle}>
      <p>{message}</p>
      <button onClick={() => dispatch(rmNoti())} style={buttonStyle}>
        &#10005;
      </button>
    </div>
  )
}

export default Notification
