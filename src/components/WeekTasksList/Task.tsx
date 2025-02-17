import { useUpdateDeleteTask } from '@/hook/useUpdateTask'
import { type Task } from '@/lib/firebase'
import { Checkbox } from '@/ui/checkbox'
import Loader from '@/ui/Loader'
import { Trash2Icon } from 'lucide-react'
import { ReactNode } from 'react'
import { Button } from '@/ui/button'
import { useTaskContext } from '@/context/TaskContext'
//import { AnimatedWrapper } from './AnimatedWrapper'

export default function Task({ task }: { task: Task }) {
  const { taskRepeated } = useTaskContext()
  const { completeTask, taskState, removeTask } = useUpdateDeleteTask({
    isCompleted: task.completed,
  })
  const isTaskRepeated = taskRepeated === task.title
  return (
    <AnimatedWrapper>
      <div className="flex flex-nowrap transition-all duration-500 ease-in-out items-start gap-1 group">
        {task.isLoading ? (
          <Loader />
        ) : (
          <Checkbox
            checked={taskState.checked}
            disabled={taskState.isLoading || taskState.isDeleting}
            onCheckedChange={(checked) =>
              completeTask({ taskId: task.taskId, isCompleted: checked as boolean })
            }
            className="border-secondary data-[state=checked]:border-primary peer"
          />
        )}
        <div className="flex flex-nowrap justify-center items-start  gap-1">
          <p
            className={`py-0.5 -mt-1 transition-all duration-300 flex-1 leading-normal font-light px-1
             ${taskState.checked ? 'line-through decoration-primary/80 text-secondary' : 'text-foreground/85'}
             ${taskState.isDeleting ? 'text-red-800/70 animate-pulse' : ''}
             ${isTaskRepeated ? 'bg-primary/40 rounded-sm' : ''}`}
          >
            {task.title}
          </p>
          <Button
            size="icon"
            variant="destructive"
            className="-mt-1 opacity-0 p-1 w-[1.8rem] h-[1.5rem] bg-transparent text-foreground/55 shadow-none cursor-pointer
            hover:text-foreground/85 hover:bg-secondary/10 group-hover:opacity-100 transition-opacity duration-300 "
            asChild
            onClick={() => removeTask({ taskId: task.taskId, day: task.day })}
          >
            <Trash2Icon strokeWidth={2.3} />
          </Button>
        </div>
      </div>
    </AnimatedWrapper>
  )
}

interface AnimatedWrapperProps {
  children: ReactNode
}

export function AnimatedWrapper({ children }: AnimatedWrapperProps) {
  return <li className="animate-in fade-in-0 slide-in-from-top-2">{children}</li>
}
