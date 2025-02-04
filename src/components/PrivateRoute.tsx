import { useAuthContext } from '@/context/AuthContext'
import { JSX, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Skeleton } from './ui/skeleton'

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, authState } = useAuthContext()
  const [isValidatingUser, setIsValidatingUser] = useState<boolean>(true)

  useEffect(() => {
    if (authState.isLoading) setIsValidatingUser(false)
  }, [authState.isLoading])
  if (authState.isLoading || (isValidatingUser && !authState.isAuthenticated)) {
    return (
      <main className="container mx-auto flex flex-col gap-4 w-screen h-screen max-w-[400px] animate-in fade-in-20 slide-in-from-top-6 ">
        <section className="flex justify-between items-center w-full py-4 h-24">
          <Skeleton className="h-8 w-[80px] rounded-sm" />
          <Skeleton className="h-4 w-[150px] rounded-sm" />
        </section>
        <Skeleton className="w-full flex-1 flex flex-col overflow-hidden rounded-[3rem] p-0" />
        <section className="flex justify-between items-center w-full py-4 h-24">
          <Skeleton className="h-10 rounded-sm  w-full" />
        </section>
      </main>
    )
  }
  if (!user) {
    return <Navigate to="/" state={{ error: 'Necesitas iniciar sesión primero' }} />
  }
  return children
}
