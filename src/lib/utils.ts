import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type Task } from './firebase'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type TasksObject = {
  [taskId: string]: Task
}
export type TaskByWeek = Task[][]

export const initialWeekDays: TaskByWeek = Array.from({ length: 7 }, () => [])

export function getTaskByWeek(tasksFB: TasksObject): TaskByWeek {
  const weekDays = structuredClone(initialWeekDays) as TaskByWeek
  for (const taskId in tasksFB) {
    const task = tasksFB[taskId]
    const day = task.day
    const draftTask = {
      taskId,
      isLoading: false,
      ...(task as Omit<Task, 'taskId'>),
    }
    //console.log({ day, draftTask })
    weekDays[day].push(draftTask)
  }

  return weekDays
}
export const getLongDay = (day: number) => {
  const date = new Date()
  const lang = navigator.language
  date.setDate(date.getDate() - date.getDay() + day)
  return date.toLocaleDateString(lang, { weekday: 'long' })
}
export const getLongMonthDay = (day: number) => {
  const lang = navigator.language
  const { weekStart } = getWeekRange()

  const date = new Date(weekStart)
  date.setDate(date.getDate() + day)

  const month = date.toLocaleString(lang, { month: 'long' })
  const dayMonth = date.getDate().toString().padStart(2, '0')
  //const time = date.toLocaleString(lang, { hour: '2-digit', minute: '2-digit', hour12: true })

  return `${month} ${dayMonth} `
}
export function getWeekRange() {
  const currentDate = new Date()
  const currentDay = currentDate.getDay() // Día de la semana (0 = Domingo, 1 = Lunes, etc.)
  const weekStart = new Date(currentDate)
  weekStart.setDate(currentDate.getDate() - (currentDay - 1))
  weekStart.setHours(0, 0, 0, 0)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6) // Domingo de la semana actual
  weekEnd.setHours(23, 59, 59, 999)
  return { weekStart: weekStart.getTime(), weekEnd: weekEnd.getTime() }
}
export function getCurrentWeekText() {
  const { weekStart, weekEnd } = getWeekRange()
  const startDate = new Date(weekStart)
  const endDate = new Date(weekEnd)

  const shortMonth = new Intl.DateTimeFormat(navigator.language, { month: 'short' })
  // Obtiene el día y el mes abreviado para el inicio y fin de la semana
  const startDay = startDate.getDate()
  const startMonth = shortMonth.format(startDate)
  const endDay = endDate.getDate()
  const endMonth = shortMonth.format(endDate)
  const year = startDate.getFullYear()

  // Si la semana está en el mismo mes
  if (startMonth === endMonth) return `${startDay} - ${endDay} ${startMonth} ${year}`
  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`
}
