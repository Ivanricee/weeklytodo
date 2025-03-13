import RegisterForm from '@/components/RegisterForm'
import SignInForm from '@/components/SignInForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

export default function SignIn() {
  const [activeTab, setActiveTab] = useState<string>('sign-in')

  return (
    <main className="container mx-auto bg-background flex items-center justify-center w-screen h-screen">
      <Tabs
        onValueChange={setActiveTab}
        value={activeTab}
        defaultValue="sign-in"
        className="w-full xl:w-1/4 md:w-2/5 sm:w-2/4  flex flex-col rounded-3xl border-[1.7px] border-secondary/50 bg-transparent shadow-3xl p-0  animate-in fade-in-20 slide-in-from-top-4"
      >
        <span className="shadow-none bg-transparent text-3xl font-bold uppercase font-rubik p-6 pb-0 text-foreground/75 animate-in fade-in-0 slide-in-from-top-4">
          {activeTab === 'sign-in' ? (
            <p key="sign-in" className=" animate-in fade-in-0 slide-in-from-top-2">
              Sign in
            </p>
          ) : (
            <p key="register" className="animate-in fade-in-0 slide-in-from-top-2">
              Register
            </p>
          )}
        </span>

        <TabsContent value="sign-in">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
        <TabsList className="w-full bg-transparent shadow-none p-6 pt-0 flex justify-center gap-1">
          <span className=" text-sm font-light text-foreground/90">
            {activeTab === 'sign-in' ? (
              <p key="signindesc" className=" animate-in fade-in-10">
                Don't have an account?
              </p>
            ) : (
              <p key="registerdesc" className=" animate-in fade-in-10">
                Already have an account?
              </p>
            )}
          </span>
          <TabsTrigger
            value="register"
            className={`shadow-none bg-transparent hidden text-sm font-normal text-primary p-0
              ${activeTab === 'sign-in' ? 'flex' : ''}`}
          >
            Register
          </TabsTrigger>
          <TabsTrigger
            value="sign-in"
            className={`shadow-none bg-transparent hidden text-sm font-normal text-primary p-0
            ${activeTab !== 'sign-in' ? 'flex' : ''}`}
          >
            Sign in here
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </main>
  )
}
