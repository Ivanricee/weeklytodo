import { Button } from '@/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card'

import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '@/schemas/signin-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/ui/form'
import CustomFormField from '@/components/CustomFormField'
import { useAuthContext } from '@/context/AuthContext'

export default function SignInForm() {
  const { user, signIn, authState, logAsGuest } = useAuthContext()
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
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader
        key="registerheader"
        className="pt-1 pb-8 text-sm font-light text-foreground/90 animate-in fade-in-0"
      >
        Access Your Account
      </CardHeader>

      <CardContent className="flex items-center justify-center w-full h-full">
        <Form {...form}>
          <form className="w-full flex flex-col gap-3" onSubmit={form.handleSubmit(signIn)}>
            <CustomFormField
              control={form.control}
              label="Email"
              name="email"
              type="email"
              placeholder="ivanrice@gmail.com"
              inputFocus
            />
            <CustomFormField
              control={form.control}
              label="Password"
              name="password"
              type="password"
              placeholder="password"
            />
            <div className="text-sm text-red-600">{error && <p>{error}</p>}</div>
            <CardFooter className="flex flex-col justify-center p-0 gap-2">
              <Button disabled={isLoading} className="w-full">
                Sign in
              </Button>
              <Button variant="outline" className="w-full" type="button" onClick={logAsGuest}>
                Continue as guest
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
