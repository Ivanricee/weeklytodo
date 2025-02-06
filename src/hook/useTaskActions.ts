import { generateTaskId, readTaskFB, writeTaskFB } from '@/lib/firebase'
import { initialWeekDays, type TaskByWeek } from '@/lib/utils'
import { addTaskSchema } from '@/schemas/addtask-schema'
import { useEffect, useState } from 'react'
import { z } from 'zod'

export type actionState = {
  loading: boolean
  error: string | null
}

export default function useTaskActions() {
  const [weekTasks, setWeekTasks] = useState<TaskByWeek>(structuredClone(initialWeekDays))
  const [actionState, setActionState] = useState<actionState>({
    loading: false,
    error: null,
  })

  useEffect(() => {
    readTaskFB((taskByWeek) => setWeekTasks(taskByWeek))
  }, [])

  const writeTask = async (data: z.infer<typeof addTaskSchema>, day: number) => {
    setActionState((state) => ({ ...state, error: null }))
    const title = data.title
    const draftTaskId = generateTaskId()
    if (draftTaskId) {
      const completed = false
      const date = Date.now()
      const copyWeekTasks = structuredClone(weekTasks) as TaskByWeek
      const newTask = { taskId: draftTaskId, title, date, day, completed, isLoading: true }
      copyWeekTasks[day].push(newTask)
      setWeekTasks(copyWeekTasks)
      const { error } = await writeTaskFB(newTask)
      if (error) {
        setWeekTasks(structuredClone(weekTasks))
        return setActionState((state) => ({ ...state, error: error }))
      }
      //return setActionState((cState) => ({ ...cState, loading: false }))
    }
  }

  return { weekTasks, writeTask, actionState /*deleteTask*/ }
}
