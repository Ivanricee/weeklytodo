import { type Task } from '@/lib/firebase'
import { Checkbox } from '@/ui/checkbox'

export default function Task({ task }: { task: Task }) {
  const toggleTask = () => {
    console.log('crear funcion para editar la task')
  }
  return (
    <div
      className="animate-in fade-in-0 slide-in-from-top-2 bg-emerald-500/5 flex flex-nowrap
    items-center gap-2 line-through decoration-primary"
    >
      <Checkbox checked={task.completed} onCheckedChange={toggleTask} />
      {task.title} {task.isLoading}
    </div>
  )
}
