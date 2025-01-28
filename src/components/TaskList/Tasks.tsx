import { type Task } from '@/lib/firebase'

import { AccordionItem, AccordionContent, AccordionTrigger } from '@/ui/accordion'
const getLocalizeDate = (timestamp: number, isDay: boolean = false) => {
  const date = new Date(timestamp)
  const lang = navigator.language.split('-')[0]
  if (isDay) return date.toLocaleDateString(lang, { weekday: 'long' })
  return date.toLocaleDateString(lang, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
export default function Tasks({ tasks }: { tasks: Task[] }) {
  //console.log('k es esto tio ', tasks)

  return (
    <>
      {tasks.map((task, idx) => {
        //console.log('como aparecen las tas? ', task)

        return (
          <AccordionContent key={idx}>
            <small className="block">{getLocalizeDate(task.date)}</small>
            {task.title} {task.isLoading}
          </AccordionContent>
        )
      })}
    </>
  )
}
