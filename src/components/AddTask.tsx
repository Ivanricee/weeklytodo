import useTaskActions from '@/hook/useTaskActions'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'
import { FormEvent } from 'react'

interface AddTaskProps {
  writeTask: (e: FormEvent<HTMLFormElement>) => void
}
export default function AddTask({ writeTask }: AddTaskProps) {
  //const { task, writeTask } = useTaskActions()
  return (
    <form className="flex flex-col gap-2" onSubmit={writeTask}>
      <Input placeholder="Titulo de la tarea" type="text" id="title" name="title" />
      <Label htmlFor="description"></Label>
      <div className="flex justify-center py-2 pb-4 relative">
        <Button size="sm" type="submit">
          Agregar Tarea
        </Button>
      </div>
    </form>
  )
}
