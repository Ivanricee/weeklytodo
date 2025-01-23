import TaskList from '@/components/TaskList'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import useAuth from '@/hook/useAuth'
import { Link } from 'react-router-dom'

export default function TodoList() {
  const { logOut, authState, user } = useAuth({ redirecTo: '/' })
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
    <main className="container mx-auto bg-zinc-900/20 flex flex-col w-screen h-screen max-w-[400px]">
      <section className="flex justify-between w-full items-center py-4 h-[70px]">
        <div>
          <Button variant={'outline'} onClick={logOut} disabled={authState.isLoading}>
            Log out
          </Button>
          <p className="text-red-400 text-sm">{authState.error && <p>{authState.error} </p>}</p>
        </div>
        <p className="text-muted-foreground text-sm">Hola {user.email}</p>
      </section>
      <Card className="flex-1 flex flex-col overflow-hidden p-4">
        <CardHeader className="text-xl">Mi lista de tareas</CardHeader>
        <TaskList />
      </Card>
      <section className=" py-2">
        <h2>Footer</h2>
      </section>
    </main>
  )
}
