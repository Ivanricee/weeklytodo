import { generateTaskId, readTaskFB, writeTaskFB } from '@/lib/firebase'
import { guestUser, readLocalTask, writeLocalTask } from '@/lib/localStorage'
import { initialWeekDays, type TaskByWeek } from '@/lib/utils'
import { addTaskSchema } from '@/schemas/addtask-schema'
import { useCallback, useEffect, useRef, useState } from 'react'
import { z } from 'zod'

export type actionState = {
  loading: boolean
  error: string | null
}

export default function useTaskActions() {
  const [weekTasks, setWeekTasks] = useState<TaskByWeek>(structuredClone(initialWeekDays))
  const [taskRepeated, setTaskRepeated] = useState<string | null>(null)
  const [actionState, setActionState] = useState<actionState>({
    loading: true,
    error: null,
  })

  const isInitialLoad = useRef(true)
  const readTaskCB = useCallback(async () => {
    const localTask = await readLocalTask()
    if (localTask) {
      setWeekTasks(localTask)
      if (isInitialLoad.current) {
        setActionState((state) => ({ ...state, loading: false }))
        isInitialLoad.current = false
      }
      return
    }

    await readTaskFB((taskByWeek, error) => {
      setWeekTasks(taskByWeek)
      if (error) setActionState((state) => ({ ...state, error: error }))
      if (isInitialLoad.current) {
        setActionState((state) => ({ ...state, loading: false }))
        isInitialLoad.current = false
      }
    })
  }, [])
  useEffect(() => {
    readTaskCB()
  }, [])

  const writeTask = async (data: z.infer<typeof addTaskSchema>, day: number) => {
    const localUser = guestUser() === 'Guest'
    const localTaskId = `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    setActionState((state) => ({ ...state, error: null }))
    const title = data.title
    const draftTaskId = !localUser ? generateTaskId() : localTaskId
    if (draftTaskId) {
      const completed = false
      const date = Date.now()
      const copyWeekTasks = structuredClone(weekTasks) as TaskByWeek
      const newTask = { taskId: draftTaskId, title, date, day, completed, isLoading: true }
      copyWeekTasks[day].push(newTask)
      setWeekTasks(copyWeekTasks)
      const { error } = !localUser
        ? await writeTaskFB(newTask)
        : writeLocalTask(newTask, localTaskId)
      await readTaskCB()
      if (error) {
        setWeekTasks(structuredClone(weekTasks))
        return setActionState((state) => ({ ...state, error: error }))
      }
    }
  }

  return { weekTasks, writeTask, actionState, setWeekTasks, taskRepeated, setTaskRepeated }
}
