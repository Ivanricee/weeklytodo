import useTaskActions from '@/hook/useTaskActions'
import { Task } from '@/lib/firebase'
import { ScrollArea } from '@/ui/scroll-area'
import { Separator } from '@/ui/separator'
import { FormEvent, useOptimistic } from 'react'
import AddTask from './AddTask'

interface TaskListProps {
  task: Task[]
}
export default function TaskList() {
  const { task, writeTask } = useTaskActions()
  console.log('task on wirte: ', { task })
  return (
    <div className=" flex flex-col  overflow-hidden">
      <AddTask writeTask={writeTask} />

      <ScrollArea className="w-full flex-1 rounded-md border">
        <div className="text-sm flex-wrap p-2">
          {task.map((taskItem) => (
            <div key={taskItem.taskId} className="mr-2 mb-2">
              {taskItem.title} {taskItem.isLoading}
              {taskItem.isLoading && <p>is loading</p>}
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
