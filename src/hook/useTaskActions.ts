import { generateTaskId, readTaskFB, type Task, writeTaskFB } from '@/lib/firebase'
import { initialWeekDays, type TaskByWeek } from '@/lib/utils'
import { addTaskSchema } from '@/schemas/addtask-schema'
import { useEffect, useState } from 'react'
import { z } from 'zod'

type actionState = {
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

  const getDay = (date: number) => new Date(date).getDay()

  const writeTask = async (data: z.infer<typeof addTaskSchema>) => {
    setActionState((cState) => ({ ...cState, loading: true }))

    const title = data.title
    const draftTaskId = generateTaskId()
    if (draftTaskId) {
      const completed = false
      const date = Date.now()
      const day = getDay(date)
      const copyWeekTasks = structuredClone(weekTasks) as TaskByWeek
      const newTask = { taskId: draftTaskId, title, date, completed, isLoading: true }
      copyWeekTasks[day].push(newTask)
      setWeekTasks(copyWeekTasks)
      const { error } = await writeTaskFB(newTask)
      if (error) return setActionState({ error: error, loading: false })
      return setActionState((cState) => ({ ...cState, loading: false }))
    }
  }

  return { weekTasks, writeTask, actionState, getDay /*deleteTask*/ }
}
