import RegisterForm from '@/components/RegisterForm'
import SignInForm from '@/components/SignInForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SignIn() {
  return (
    <main className="container mx-auto bg-zinc-900/20 flex items-center justify-center w-screen h-screen">
      <Tabs defaultValue="sign-in" className="w-full xl:w-1/4 md:w-2/5 sm:w-2/4 ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign in</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </main>
  )
}
