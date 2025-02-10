import { type Task as TaskType } from '@/lib/firebase'
import Task from './Task'
import { ListTodo } from 'lucide-react'
import { ScrollArea } from '@/ui/scroll-area'

export default function TaskList({ tasks }: { tasks: TaskType[] }) {
  //console.log('k es esto tio ', tasks)

  return (
    <ScrollArea className="flex-1 ">
      {tasks.map((task, idx) => {
        //console.log('como aparecen las tas? ', task)
        return <Task key={idx} task={task} />
      })}
      {tasks.length === 0 && (
        <div className="animate-in fade-in-0 flex flex-col items-center justify-center h-full gap-2">
          <div className="bg-secondary/10 rounded-md aspect-square w-14 flex items-center justify-center">
            <ListTodo className="text-secondary/55" size={40} />
          </div>
          <p className="text-foreground/40 text-sm">Your task list is empty.</p>
        </div>
      )}
    </ScrollArea>
  )
}
