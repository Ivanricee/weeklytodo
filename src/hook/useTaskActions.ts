import { generateTaskId, readTaskFB, type Task, writeTaskFB } from '@/lib/firebase'
import { FormEvent, useEffect, useState } from 'react'

type actionState = {
  loading: boolean
  error: string | null
}
export default function useTaskActions() {
  const [task, setTask] = useState<Task[]>([])
  const [actionState, setActionState] = useState<actionState>({
    loading: false,
    error: null,
  })

  useEffect(() => {
    readTaskFB((tasks) => setTask(tasks))
  }, [])
  const writeTask = async (e: FormEvent<HTMLFormElement>) => {
    setActionState((cState) => ({ ...cState, loading: true }))
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get('title')
    const draftTaskId = generateTaskId()
    if (typeof title === 'string' && draftTaskId) {
      const completed = false
      const date = Date.now()

      const draftTaskData = { taskId: draftTaskId, title, date, completed, isLoading: true }
      const draftTasks = [...task, draftTaskData]
      setTask(draftTasks)
      const { error } = await writeTaskFB(draftTaskData)
      if (error) return setActionState({ error: error, loading: false })
      return setActionState((cState) => ({ ...cState, loading: false }))
    }
  }
  return { task, writeTask, actionState /*deleteTask*/ }
}
