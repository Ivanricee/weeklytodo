import { addTaskSchema } from '@/schemas/addtask-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/ui/form'
import CustomFormField from './CustomFormField'
import { SendHorizonalIcon } from 'lucide-react'
import { Button } from '@/ui/button'

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
  const titleValue = form.watch('title')
  return (
    <div className={` overflow-hidden w-full backdrop-blur-2xl `}>
      <Form {...form}>
        <form
          className="flex w-full"
          onSubmit={form.handleSubmit((data) => {
            writeTask(data, day)
            form.reset()
          })}
        >
          <CustomFormField
            control={form.control}
            name="title"
            placeholder="Add a new task..."
            inputClass="p-0 focus-visible:ring-0 px-1 border-none w-full rounded-sm border-0 focus-visible:bg-input/5"
            inputFocus={true}
          />
          {titleValue.length >= 3 && (
            <Button size="icon" type="submit">
              <SendHorizonalIcon />
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}
