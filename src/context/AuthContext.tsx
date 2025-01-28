import useAuth, { AuthStateProps } from '@/hook/useAuth'
import { formSchema } from '@/schemas/signin-form-schema'
import { User } from 'firebase/auth'
import { createContext, useContext } from 'react'
import { z } from 'zod'

interface Props {
  children: React.ReactNode
}
type AuthContextType = {
  user: User | null
  signIn: (data: z.infer<typeof formSchema>) => void
  register: (data: z.infer<typeof formSchema>) => void
  logOut: () => void
  authState: AuthStateProps
}
const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: Props) {
  const { user, signIn, register, logOut, authState } = useAuth()
  return (
    <AuthContext.Provider value={{ user, signIn, register, logOut, authState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext must be used within a AuthProvider')
  return context
}
