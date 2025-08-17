import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import customTheme from './styles/customTheme'
import store from './store'
import App from './App'
import './index.css'
import './icons'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={customTheme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
)
