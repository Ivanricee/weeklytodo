import useTaskActions, { actionState } from '@/hook/useTaskActions'
import { ScrollArea } from '@/ui/scroll-area'
import AddTask from '@/components/AddTask'
import SkeletonTasks from './SkeletonTasks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion'
import Tasks from './Tasks'
import { act, ReactNode } from 'react'

const getDay = (day: number) => {
  const date = new Date()
  const lang = navigator.language
  date.setDate(date.getDate() - date.getDay() + day)
  return date.toLocaleDateString(lang, { weekday: 'long' })
}

export default function TaskList() {
  const { weekTasks, writeTask, actionState } = useTaskActions()

  return (
    <div className=" flex flex-col flex-1 overflow-hidden">
      <ScrollArea className="w-full flex-1 rounded-md border">
        <div className="text-sm flex-wrap p-2">
          {
            <Accordion type="single" collapsible defaultValue={String(new Date().getDay())}>
              {weekTasks.map((_, idx, arrTasks) => {
                //start from monday
                const normalizedDay = idx === 6 ? 0 : idx + 1
                const normalizedTask = arrTasks[normalizedDay]
                return (
                  <AccordionItem key={idx} value={String(normalizedDay)}>
                    <AccordionTrigger>{getDay(normalizedDay)}</AccordionTrigger>
                    {actionState.loading ? (
                      <AccordionContent>
                        <SkeletonTasks />
                      </AccordionContent>
                    ) : (
                      <Tasks tasks={normalizedTask}>
                        <p>task: {normalizedDay}</p>
                        <AddTask writeTask={writeTask} day={normalizedDay} />
                      </Tasks>
                    )}
                  </AccordionItem>
                )
              })}
            </Accordion>
          }
        </div>
      </ScrollArea>
    </div>
  )
}

type ContentType = {
  actionState: actionState
  children: ReactNode
}
function TaskContent({ actionState, children }: ContentType) {
  if (actionState.loading && actionState.error) {
    return (
      <AccordionContent>
        <SkeletonTasks />
      </AccordionContent>
    )
  } else {
    return children
  }
}
