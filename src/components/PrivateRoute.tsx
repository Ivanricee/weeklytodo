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
      <main className="container mx-auto bg-zinc-900/20 flex flex-col w-screen h-screen max-w-[400px] animate-out fade-out-20 slide-out-from-top-5 ">
        <section className="flex justify-between w-full items-center py-4 h-[70px]">
          <Skeleton className="h-8 w-[80px] rounded-sm" />
          <Skeleton className="h-4 w-[150px] rounded-sm" />
        </section>
        <Skeleton className="rounded-2xl flex-1 flex flex-col overflow-hidden w-full" />
        <section className=" py-2">
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
