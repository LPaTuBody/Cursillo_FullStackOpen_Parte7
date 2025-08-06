import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

import { BlogContextProvider } from './contexts/BlogContext.jsx'
import { NotiContextProvider } from './contexts/NotiContext.jsx'
import { LoginContextProvider } from './contexts/LoginContext.jsx'
import { UsersContextProvider } from './contexts/UsersContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BlogContextProvider>
      <NotiContextProvider>
        <LoginContextProvider>
          <UsersContextProvider>
            <App />
          </UsersContextProvider>
        </LoginContextProvider>
      </NotiContextProvider>
    </BlogContextProvider>
  </QueryClientProvider>,
)
