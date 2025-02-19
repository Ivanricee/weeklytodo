import { getTaskByWeek, getWeekRange, TaskByWeek } from './utils'

const localStorage = window.localStorage
const generateData = () => {
  const date = new Date()
  const currentTime = date.getTime()
  const currentDay = date.getDay()
  const localData = {
    0: {
      title: '5km run',
      date: currentTime,
      day: currentDay,
      completed: false,
    },
    1: {
      title: 'Walk the dog',
      date: date.setSeconds(date.getSeconds() + 1),
      day: currentDay,
      completed: false,
    },
    2: {
      title: 'Get groceries',
      date: date.setSeconds(date.getSeconds() + 2),
      day: currentDay,
      completed: false,
    },
  }
  return structuredClone(localData)
}

export const guestUser = () => {
  return localStorage.getItem('user')
}
export const signinAsGuest = (): { user?: string; error?: string } => {
  localStorage.setItem('tasks', JSON.stringify(generateData()))
  localStorage.setItem('user', 'Guest')
  const user = localStorage.getItem('user')

  if (!user) return { error: 'user not found' }

  return user === 'Guest' ? { user: 'Guest' } : { error: 'user not found' }
}
export const LogoutGuest = () => {
  localStorage.removeItem('tasks')
  localStorage.removeItem('user')
}

// DATABASE
export type Task = {
  taskId: string
  title: string
  date: number
  day: number
  completed: boolean
  isLoading?: boolean
}

export const readLocalTask = async () => {
  const localTask = await localStorage.getItem('tasks')
  //const { weekStart, weekEnd } = getWeekRange()
  if (localTask) {
    const taskByWeekParsed = JSON.parse(localTask)
    const taskByWeek = getTaskByWeek(taskByWeekParsed) as TaskByWeek
    return taskByWeek
  }
}

type writeTaskRespo = {
  success: boolean
  error?: string | null
}
export const writeLocalTask = (
  { title, date, completed, day }: Task,
  localTaskId: string
): writeTaskRespo => {
  const userId = localStorage.getItem('user')
  const localTask = localStorage.getItem('tasks')
  if (!userId || !localTask) return { success: false, error: 'no estás conectado' }
  const localTaskParsed = JSON.parse(localTask)
  localTaskParsed[localTaskId] = { title, date, completed, day, isLoading: false }
  localStorage.setItem('tasks', JSON.stringify(localTaskParsed))
  return { success: true }
}

type completeTask = {
  taskId: string
  isCompleted: boolean
}
export const completeLocalTask = ({ taskId, isCompleted }: completeTask) => {
  const userId = localStorage.getItem('user')
  const localTask = localStorage.getItem('tasks')
  if (!userId || !localTask) return { success: false, error: 'no estás conectado' }
  const localTaskParsed = JSON.parse(localTask)
  localTaskParsed[taskId].completed = isCompleted
  localStorage.setItem('tasks', JSON.stringify(localTaskParsed))
  return { success: true, error: null }
}

export const removeLocalTask = ({ taskId }: { taskId: string }) => {
  const userId = localStorage.getItem('user')
  const localTask = localStorage.getItem('tasks')
  if (!userId || !localTask) return { success: false, error: 'no estás conectado' }
  const localTaskParsed = JSON.parse(localTask)
  delete localTaskParsed[taskId]

  localStorage.setItem('tasks', JSON.stringify(localTaskParsed))
  return { success: true, error: null }
}
