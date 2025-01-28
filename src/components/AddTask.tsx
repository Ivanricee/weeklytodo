import { addTaskSchema } from '@/schemas/addtask-schema'
import { Button } from '@/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/ui/form'
import CustomFormField from './CustomFormField'

interface AddTaskProps {
  writeTask: (data: z.infer<typeof addTaskSchema>) => void
}
export default function AddTask({ writeTask }: AddTaskProps) {
  const form = useForm<z.infer<typeof addTaskSchema>>({
    defaultValues: {
      title: '',
    },
    resolver: zodResolver(addTaskSchema),
  })
  return (
    <Form {...form}>
      <form className="flex mb-4" onSubmit={form.handleSubmit(writeTask)}>
        <CustomFormField control={form.control} name="title" placeholder="Titulo de la tarea" />
        <Button size="sm" type="submit">
          Agregar Tarea
        </Button>
      </form>
    </Form>
  )
}
