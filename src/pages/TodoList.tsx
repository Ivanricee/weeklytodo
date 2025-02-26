import CurrentHour from '@/components/CurrentHour'
import WeekTasksList from '@/components/WeekTasksList'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { useAuthContext } from '@/context/AuthContext'
import { TaskProvider } from '@/context/TaskContext'
import { getCurrentWeekText } from '@/lib/utils'
import { Github, LinkedinIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TodoList() {
  const { logOut, authState, user } = useAuthContext()

  if (!user) {
    return (
      <main className="container mx-auto bg-zinc-900/20 flex flex-col gap-4 items-center justify-center w-screen h-screen animate-in fade-in-20 slide-in-from-top-4">
        <h1 className="text-2xl">Usuario no encontrado</h1>
        <Button asChild>
          <Link to="/">Ir a la página de inicio</Link>
        </Button>
      </main>
    )
  }
  const userName = typeof user === 'string' ? user : user.email
  return (
    <main className="container mx-auto flex flex-col gap-4 w-screen h-screen max-w-[400px] animate-in fade-in-20 slide-in-from-top-4 px-0">
      <header className="flex gap-2 justify-between w-full items-center py-4 h-20">
        <div>
          <Button variant={'outline'} onClick={logOut} disabled={authState.isLoading}>
            Log out
          </Button>
          <p className="text-red-300 text-sm">{authState.error && authState.error}</p>
        </div>
        <p className="text-foreground/70 text-sm">Hey, {userName}!</p>
      </header>

      <Card className="flex-1 flex flex-col overflow-hidden rounded-[3rem] border-[1.7px] border-secondary/50 bg-transparent shadow-3xl p-0 backdrop-blur-sm relative min-h-[33.3rem] max-h-[45.97rem]">
        <CardHeader className="pt-4 py-3 pl-10 text-base bg-transparent backdrop-blur-sm absolute left-0 right-0 z-10 flex flex-row items-baseline justify-between">
          <CurrentHour />
          <small className="text-foreground/70 font-medium">{getCurrentWeekText()}</small>
        </CardHeader>
        <TaskProvider>
          <WeekTasksList />
        </TaskProvider>
      </Card>
      <footer className="flex flex-col items-center gap-4 text-sm text-foreground/70 font-light pt-5">
        <p className="text-center">
          Educational practice project Inspired by{' '}
          <a
            href="https://weekstack.io/"
            className="text-primary hover:underline font-normal"
            target="_blank"
            rel="noopener noreferrer"
          >
            Weekstack
          </a>
        </p>

        <div className="flex items-center gap-4 justify-center">
          <Button
            variant={'outline'}
            asChild
            className="p-0 transition-all duration-300 font-normal"
          >
            <Link
              to="https://github.com/Ivanricee/weeklytodo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2"
            >
              <Github size={16} />
              <span>Star</span>
            </Link>
          </Button>

          <Link
            to="https://www.linkedin.com/in/ivanrice/"
            target="_blank"
            className="group flex flex-nowrap gap-1 hover:text-foreground/80 transition-all duration-300"
            rel="noopener noreferrer"
          >
            <LinkedinIcon size={16} />
            <span>
              <b className="text-foreground/70 group-hover:text-foreground group-hover:underline transition-all duration-300">
                Ivanrice
              </b>
            </span>
          </Link>

          <span>|</span>

          <Link
            to="https://x.com/thebtjackson"
            className="group hover:text-foreground group-hover:underline transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Design by{' '}
            <b className="text-foreground/70 group-hover:text-foreground transition-all duration-300">
              {' '}
              Brett
            </b>
          </Link>
        </div>
      </footer>
    </main>
  )
}
