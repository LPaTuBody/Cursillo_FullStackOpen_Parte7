import { useMutation } from '@tanstack/react-query'
import { useNotiDispatch, setNoti, rmNoti } from '../contexts/NotiContext'
import { useLoginDispatch, login } from '../contexts/LoginContext'
import blogService from '../services/blogs'
import loginService from '../services/login'

export const useCheckingUser = () => {
  const rawUser = window.localStorage.getItem('userLogedIn')
  if (rawUser) {
    const user = JSON.parse(rawUser)
    blogService.setToken(user.token)
    return user
  }
}

export const useLoginMutation = () => {
  const notiDispatch = useNotiDispatch()
  const loginDispatch = useLoginDispatch()

  const { mutate: handleLogin } = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      window.localStorage.setItem('userLogedIn', JSON.stringify(user))
      blogService.setToken(user.token)
      loginDispatch(login(user))
      notiDispatch(rmNoti())
    },
    onError: (err) => {
      notiDispatch(setNoti([err.response.data.error, 'error']))
      console.log('Login error: ', err)
    },
  })

  return { handleLogin }
}
