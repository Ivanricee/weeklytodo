import useTaskActions, { type actionState } from '@/hook/useTaskActions'
import { TaskByWeek } from '@/lib/utils'
import { addTaskSchema } from '@/schemas/addtask-schema'

import { createContext, useContext } from 'react'
import { z } from 'zod'

interface Props {
  children: React.ReactNode
}
type TaskContextType = {
  actionState: actionState
  weekTasks: TaskByWeek
  writeTask: (data: z.infer<typeof addTaskSchema>, day: number) => Promise<void>
  setWeekTasks: (tasks: TaskByWeek) => void
  taskRepeated: string | null
  setTaskRepeated: (taskRepeated: string | null) => void
}
const AuthContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children }: Props) {
  const { actionState, weekTasks, writeTask, setWeekTasks, taskRepeated, setTaskRepeated } =
    useTaskActions()
  return (
    <AuthContext.Provider
      value={{ actionState, weekTasks, writeTask, setWeekTasks, taskRepeated, setTaskRepeated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuthContext must be used within a AuthProvider')
  return context
}
