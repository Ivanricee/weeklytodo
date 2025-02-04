import { type Task } from '@/lib/firebase'
import { Checkbox } from '@/ui/checkbox'

export default function Task({ task }: { task: Task }) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-top-3/4">
      <Checkbox />
      {task.title} {task.isLoading}
    </div>
  )
}
