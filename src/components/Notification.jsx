import { Box, Button } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { rmNoti } from "../reducers/notifications"

const Notification = () => {
  const [message, type] = useSelector(state => state.notification)
  const dispatch = useDispatch()

  if (!message) return null

  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda',
    padding: '10px',
    borderRadius: '5px',
    position: 'fixed',
    bottom: '30px',
    left: '30px',
    width: '40%',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: 1.5
  }

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: type === 'error' ? 'red' : 'green',
    cursor: 'pointer',
    fontSize: '0.9em',
    marginLeft: '12px',
    p: '5px 10px',
    maxHeight: '30px',
    minWidth: 0,
    alignSelf: 'center',
  }

  return (
    <Box id="notification_div" sx={notificationStyle}>
      <Box component={'p'}>{message}</Box>
      <Button onClick={() => dispatch(rmNoti())} sx={buttonStyle}>
        &#10005;
      </Button>
    </Box>
  )
}

export default Notification
