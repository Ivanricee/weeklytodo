import { AuthFirebase, authStateChange, LogoutFirebase, RegisterFirebase } from '@/lib/firebase'
import { guestUser, LogoutGuest, signinAsGuest } from '@/lib/localStorage'
import { formSchema } from '@/schemas/signin-form-schema'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export type AuthStateProps = {
  isLoading?: boolean
  isAuthenticated?: boolean
  error?: string
}
export default function useAuth() {
  const [authState, setAuthState] = useState<AuthStateProps>({
    isLoading: false,
    isAuthenticated: false,
    error: '',
  })
  const [user, setUser] = useState<User | null | string>(null)
  const navigate = useNavigate()
  useEffect(() => {
    setAuthState({ ...authState, isLoading: true })
    const guestUserName = guestUser()

    if (guestUserName) {
      setUser(guestUserName)
      setAuthState({ ...authState, isAuthenticated: true, isLoading: false })
      return
    }
    const unsuscribe = authStateChange((fBUser) => {
      if (fBUser) setUser(fBUser)
      setAuthState({ ...authState, isAuthenticated: true, isLoading: false })
    })
    return () => unsuscribe()
  }, [])

  const logAsGuest = async () => {
    setAuthState({ ...authState, isLoading: true })
    const { user, error } = signinAsGuest()
    if (user) {
      navigate('/todo')
      setUser(user)
      return setAuthState({ ...authState, isLoading: false })
    }
    setAuthState({ ...authState, error, isLoading: false })
  }
  const signIn = async (data: z.infer<typeof formSchema>) => {
    setAuthState({ ...authState, isLoading: true })
    const email = data.email
    const password = data.password
    const firebaseRes = await AuthFirebase({ email, password })
    if (firebaseRes.user) {
      navigate('/todo')
      return setAuthState({ ...authState, error: '', isLoading: false })
    }
    setAuthState({ ...authState, error: firebaseRes.error, isLoading: false })
  }
  const register = async (data: z.infer<typeof formSchema>) => {
    setAuthState({ ...authState, isLoading: true })
    let email = data.email
    let password = data.password
    const firebaseRes = await RegisterFirebase({ email, password })
    if (firebaseRes.user) {
      firebaseRes.user
      navigate('/todo')
      return setAuthState({ ...authState, error: '', isLoading: false })
    }
    setAuthState({ ...authState, error: firebaseRes.error, isLoading: false })
  }
  const logOut = async () => {
    setAuthState({ ...authState, isLoading: true })
    const guestUserName = guestUser()
    if (guestUserName) {
      await LogoutGuest()
      setUser(null)
      setAuthState({ ...authState, isLoading: false })
      return navigate('/')
    }

    const logOutResponse = await LogoutFirebase()
    if (logOutResponse?.error) {
      return setAuthState({ ...authState, error: 'Ocurrió un error al cerrar sesión' })
    }
    setUser(null)
    setAuthState({ ...authState, isLoading: false })
    return navigate('/')
  }
  return { user, signIn, logAsGuest, register, logOut, authState }
}
