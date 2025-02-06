import { addTaskSchema } from '@/schemas/addtask-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/ui/form'
import CustomFormField from './CustomFormField'

interface AddTaskProps {
  writeTask: (data: z.infer<typeof addTaskSchema>, day: number) => void
  day: number
  areTasksEmpty: boolean
}
export default function AddTask({ writeTask, day, areTasksEmpty }: AddTaskProps) {
  const form = useForm<z.infer<typeof addTaskSchema>>({
    defaultValues: {
      title: '',
    },
    resolver: zodResolver(addTaskSchema),
  })
  return (
    <div className={` overflow-hidden w-full backdrop-blur-2xl`}>
      <Form {...form}>
        <form className="flex w-full" onSubmit={form.handleSubmit((data) => writeTask(data, day))}>
          <CustomFormField
            control={form.control}
            name="title"
            placeholder="Add a new task..."
            inputClass="p-0 px-1 border-none w-full rounded-none border-0 border-secondary/30 shadow-none focus-visible:ring-0 focus-visible:border-solid focus-visible:border-b"
            inputFocus={true}
          />
        </form>
      </Form>
    </div>
  )
}
