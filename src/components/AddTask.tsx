import { addTaskSchema } from '@/schemas/addtask-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/ui/form'
import CustomFormField from './CustomFormField'
import { SendHorizonalIcon } from 'lucide-react'
import { Button } from '@/ui/button'
import { useTaskContext } from '@/context/TaskContext'

interface AddTaskProps {
  day: number
}
export default function AddTask({ day }: AddTaskProps) {
  const { writeTask, weekTasks, setTaskRepeated } = useTaskContext()

  const form = useForm<z.infer<typeof addTaskSchema>>({
    defaultValues: {
      title: '',
    },
    resolver: zodResolver(addTaskSchema),
  })

  const titleValue = form.watch('title')
  const onSubmit = form.handleSubmit((data) => {
    const taskExist = weekTasks[day].find((task) => task.title === data.title)
    if (taskExist) {
      form.reset()
      setTaskRepeated(data.title)
      return setTimeout(() => setTaskRepeated(null), 1000)
    }
    writeTask(data, day)
    form.reset()
  })
  return (
    <div className={` overflow-hidden w-full `}>
      <Form {...form}>
        <form className="flex w-full" onSubmit={onSubmit}>
          <CustomFormField
            control={form.control}
            name="title"
            placeholder="Add a new task..."
            inputClass="p-0 rounded-sm bg-transparent focus-visible:ring-0 px-1 border-none w-full rounded-sm border-0
            focus-visible:bg-secondary/5 placeholder:text-secondary/70 shadow-none px-2"
            inputFocus={true}
          />
          {titleValue.length >= 3 && (
            <Button
              key="submittask"
              size="icon"
              type="submit"
              className={`transition-all animate-in fade-in-0 duration-300`}
            >
              <SendHorizonalIcon />
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}
