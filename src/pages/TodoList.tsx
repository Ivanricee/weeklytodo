import CurrentHour from '@/components/CurrentHour'
import WeekTasksList from '@/components/WeekTasksList'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { useAuthContext } from '@/context/AuthContext'
import { getCurrentWeekText } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function TodoList() {
  const { logOut, authState, user } = useAuthContext()

  if (!user) {
    return (
      <main className="container mx-auto bg-zinc-900/20 flex flex-col gap-4 items-center justify-center w-screen h-screen">
        <h1 className="text-2xl">Usuario no encontrado</h1>
        <Button asChild>
          <Link to="/">Ir a la página de inicio</Link>
        </Button>
      </main>
    )
  }

  return (
    <main className="container mx-auto flex flex-col gap-4 w-screen h-screen max-w-[400px] animate-in fade-in-20 slide-in-from-top-4 ">
      <section className="flex gap-2 justify-between w-full items-center py-4 h-24">
        <div>
          <Button variant={'outline'} onClick={logOut} disabled={authState.isLoading}>
            Log out
          </Button>
          <p className="text-red-400 text-sm">{authState.error && <p>{authState.error} </p>}</p>
        </div>
        <p className="text-muted-foreground text-sm">Hola {user.email}</p>
      </section>
      <Card className="flex-1 flex flex-col overflow-hidden rounded-[3rem] border-[1.7px] border-secondary/50 bg-transparent shadow-3xl p-0 backdrop-blur-sm relative min-h-[33.3rem] max-h-[45.97rem]">
        <CardHeader className="pt-4 py-3 pl-10 text-base bg-transparent backdrop-blur-sm absolute left-0 right-0 z-10 flex flex-row items-baseline justify-between">
          <CurrentHour />
          <small className="text-foreground/70 font-medium">{getCurrentWeekText()}</small>
        </CardHeader>
        <WeekTasksList />
      </Card>
      <section className="flex gap-2 justify-between w-full items-center py-4 h-24">
        <h2>Footer</h2>
      </section>
    </main>
  )
}
