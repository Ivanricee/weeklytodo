import { useTaskContext } from '@/context/TaskContext'
import { completeTaskFB, removeTaskFB } from '@/lib/firebase'
import { completeLocalTask, guestUser, removeLocalTask } from '@/lib/localStorage'
import { TaskByWeek } from '@/lib/utils'
import { useState } from 'react'

interface useUpdateTaskProps {
  isCompleted: boolean
}
type isCheckedType = {
  checked: boolean
  isLoading: boolean
  isDeleting: boolean
  error: string | null
}
export function useUpdateDeleteTask({ isCompleted }: useUpdateTaskProps) {
  const { weekTasks, setWeekTasks } = useTaskContext()
  const [taskState, setTaskState] = useState<isCheckedType>({
    checked: isCompleted,
    isLoading: false,
    isDeleting: false,
    error: null,
  })
  type completeTask = {
    taskId: string
    isCompleted: boolean
    day: number
  }
  const completeTask = async ({ isCompleted, taskId, day }: completeTask) => {
    const localUser = guestUser() === 'Guest'
    setTaskState((state) => ({ ...state, checked: isCompleted, isLoading: true }))
    const draftWeekTasks = structuredClone(weekTasks) as TaskByWeek
    draftWeekTasks[day].map((task) => {
      task.taskId === taskId && (task.completed = isCompleted)
      return task
    })

    const { error } = !localUser
      ? await completeTaskFB({ isCompleted, taskId })
      : completeLocalTask({ isCompleted, taskId })
    if (error)
      return setTaskState((state) => ({ ...state, checked: !isCompleted, isLoading: false, error }))
    setWeekTasks(draftWeekTasks)
    setTaskState((prevChecked) => ({ ...prevChecked, isLoading: false }))
  }

  type deleteTaskProps = {
    taskId: string
    day: number
  }
  const removeTask = async ({ taskId, day }: deleteTaskProps) => {
    const localUser = guestUser() === 'Guest'
    setTaskState((state) => ({ ...state, isDeleting: true }))
    const draftWeekTasks = structuredClone(weekTasks) as TaskByWeek
    const dayDeletedTask = draftWeekTasks[day].filter((task) => task.taskId !== taskId)
    draftWeekTasks[day] = dayDeletedTask

    const { error } = !localUser ? await removeTaskFB({ taskId }) : removeLocalTask({ taskId })
    if (error) return setTaskState((state) => ({ ...state, isDeleting: false, error }))
    setWeekTasks(draftWeekTasks)
    setTaskState((state) => ({ ...state, isDeleting: false }))
  }
  return { completeTask, removeTask, taskState }
}
