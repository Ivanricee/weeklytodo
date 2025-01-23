import { Button } from '@/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card'

import useAuth from '@/hook/useAuth'
import { Navigate } from 'react-router-dom'
import CustomFormField from '@/components/CustomFormField'
import { useForm } from 'react-hook-form'
import { Form } from '@/ui/form'
import { z } from 'zod'
import { formSchema } from '@/schemas/signin-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function RegisterForm() {
  const { user, register, authState } = useAuth({ redirecTo: '/todo' })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  if (user) return <Navigate replace to="/todo" />
  const { error, isLoading } = authState
  return (
    <Card className="w-full flex flex-col gap-3">
      <CardHeader> Bienvenido, Completa Tu Registro </CardHeader>

      <CardContent className="flex items-center justify-center w-full h-full">
        <Form {...form}>
          <form className="w-full flex flex-col gap-3" onSubmit={form.handleSubmit(register)}>
            <CustomFormField
              control={form.control}
              label="Email"
              name="email"
              type="email"
              placeholder="ivanrice@gmail.com"
            />
            <CustomFormField
              control={form.control}
              label="Password"
              name="password"
              type="password"
              placeholder="password"
            />
            <div className="text-sm text-red-400">{error && <p>{error}</p>}</div>
            <CardFooter className="flex justify-center p-0">
              <Button disabled={isLoading}>Register</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
