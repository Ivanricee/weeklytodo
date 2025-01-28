import { clsx, type ClassValue } from 'clsx'
import { DataSnapshot } from 'firebase/database'
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
  for (const taskId in tasksFB) {
    const task = tasksFB[taskId]
    const date = new Date(task.date)
    const day = date.getDay()
    const draftTask = {
      taskId,
      isLoading: false,
      ...(task as Omit<Task, 'taskId'>),
    }
    //console.log({ day, draftTask })

    initialWeekDays[day - 1].push(draftTask)
  }

  return initialWeekDays
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
  return { weekStart: weekStart.getTime(), weekEnd: weekEnd.getTime(), currentDay }
}
