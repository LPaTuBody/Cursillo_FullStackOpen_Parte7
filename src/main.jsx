import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { NotiContextProvider } from './NotificationContext'
import './style.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotiContextProvider>
    <Router>
      <App />
    </Router>
  </NotiContextProvider>
)