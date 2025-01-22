import { AuthFirebase, authStateChange, LogoutFirebase, RegisterFirebase } from '@/lib/firebase'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const validateEmail = (email: FormDataEntryValue | null) => {
  if (typeof email === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) return null
    return email.trim()
  }
}
const validatePassword = (password: FormDataEntryValue | null) => {
  if (typeof password === 'string' && password.trim().length >= 8) return password
  return null
}
interface useAuthProps {
  redirecTo: string
}
export default function useAuth({ redirecTo }: useAuthProps) {
  const [authState, setAuthState] = useState<{ isLoading?: boolean; error?: string }>({
    isLoading: false,
    error: '',
  })
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    setAuthState({ ...authState, isLoading: true })
    const unsuscribe = authStateChange((fBUser) => {
      if (fBUser) setUser(fBUser)
      setAuthState({ ...authState, isLoading: false })
    })
    return () => unsuscribe()
  }, [])

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    let email = formData.get('email')
    let password = formData.get('password')
    email = validateEmail(email) as string | null
    password = validatePassword(password) as string | null
    if (!email || !password) return setAuthState({ error: 'Credenciales incorrectas' })

    //firebase
    setAuthState({ isLoading: true })
    const firebaseRes = await AuthFirebase({ email, password })
    if (firebaseRes.user) {
      navigate(redirecTo)
      return setAuthState({ isLoading: false })
    }

    setAuthState({ error: firebaseRes.error })
  }
  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    let email = formData.get('email')
    let password = formData.get('password')
    let registerError = ''
    email = validateEmail(email) as string | null
    password = validatePassword(password) as string | null
    registerError += !email && 'Email no válido '
    registerError += !password && 'Contraseña no válida'
    if (!email || !password) return setAuthState({ error: registerError })
    //firebase
    setAuthState({ isLoading: true })
    const firebaseRes = await RegisterFirebase({ email, password })
    if (firebaseRes.user) {
      firebaseRes.user
      navigate(redirecTo)
      return setAuthState({ isLoading: false })
    }
    setAuthState({ error: firebaseRes.error })
  }
  const logOut = async () => {
    setAuthState({ isLoading: true })
    const logOutResponse = await LogoutFirebase()
    setAuthState({ isLoading: false })
    if (logOutResponse?.error) return setAuthState({ error: 'Ocurrió un error al cerrar sesión' })
    return navigate('/')
  }
  return { user, signIn, register, logOut, authState }
}
