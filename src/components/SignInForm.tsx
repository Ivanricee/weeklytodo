import { Input } from '@/ui/input'
import { Button } from '@/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card'
import { Label } from '@radix-ui/react-label'
import useAuth from '@/hook/useAuth'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '@/schemas/signInForm'
import { zodResolver } from '@hookform/resolvers/zod'
export default function SignInForm() {
  const { user, signIn, authState } = useAuth({ redirecTo: '/todo' })
  if (user) return <Navigate replace to="/todo" />
  const { error, isLoading } = authState

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return (
    <Card className="w-full flex flex-col gap-3">
      <CardHeader>Accede a Tu Cuenta</CardHeader>

      <CardContent className="flex items-center justify-center w-full h-full">
        <form className="w-full flex flex-col gap-3" onSubmit={signIn}>
          <Label htmlFor="email">Email</Label>
          <Input placeholder="ivanrice@gmail.com" type="email" id="email" name="email" />
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
          <div className="text-sm text-red-400">{error && <p>{error}</p>}</div>
          <CardFooter className="flex justify-center p-0">
            <Button disabled={isLoading}>Sign in</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}
