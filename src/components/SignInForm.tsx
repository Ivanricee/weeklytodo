import { Button } from '@/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card'

import useAuth from '@/hook/useAuth'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '@/schemas/signin-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/ui/form'
import CustomFormField from '@/components/CustomFormField'
export default function SignInForm() {
  const { user, signIn, authState } = useAuth()
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
      <CardHeader>Accede a Tu Cuenta</CardHeader>

      <CardContent className="flex items-center justify-center w-full h-full">
        <Form {...form}>
          <form className="w-full flex flex-col gap-3" onSubmit={form.handleSubmit(signIn)}>
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
              <Button disabled={isLoading}>Sign in</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
