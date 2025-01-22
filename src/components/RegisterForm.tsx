import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card'
import { Label } from '@radix-ui/react-label'
import useAuth from '@/hook/useAuth'
import { Navigate } from 'react-router-dom'

export default function RegisterForm() {
  const { user, register, authState } = useAuth({ redirecTo: '/todo' })
  if (user) return <Navigate replace to="/todo" />
  const { error, isLoading } = authState

  return (
    <Card className="w-full flex flex-col gap-3">
      <CardHeader> Bienvenido, Completa Tu Registro </CardHeader>

      <CardContent className="flex items-center justify-center w-full h-full">
        <form className="w-full flex flex-col gap-3" onSubmit={register}>
          <Label htmlFor="email">Email</Label>
          <Input placeholder="ivanrice@gmail.com" type="text" id="email" name="email" />
          <Label htmlFor="password">Password</Label>
          <div className="text-sm text-red-400">{error && <p>{error}</p>}</div>
          <Input type="password" id="password" name="password" />
          <CardFooter className="flex justify-center p-0">
            <Button disabled={isLoading}>Register</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
