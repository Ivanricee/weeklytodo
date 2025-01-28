import useTaskActions from '@/hook/useTaskActions'
import { ScrollArea } from '@/ui/scroll-area'
import AddTask from '@/components/AddTask'
import SkeletonTasks from './SkeletonTasks'
import { Accordion, AccordionItem, AccordionTrigger } from '@/ui/accordion'
import Tasks from './Tasks'

const getDay = (day: number) => {
  const fecha = new Date(1970, 0, day + 4) // 4 de enero de 1970 es domingo
  const lang = navigator.language.split('-')[0]
  return fecha.toLocaleDateString(lang, { weekday: 'long' })
}

export default function TaskList() {
  const { weekTasks, writeTask } = useTaskActions()
  //console.log('hay algo aqui', weekTasks)
  return (
    <div className=" flex flex-col flex-1 overflow-hidden">
      <AddTask writeTask={writeTask} />

      <ScrollArea className="w-full flex-1 rounded-md border">
        <div className="text-sm flex-wrap p-2">
          {
            <Accordion type="single" collapsible defaultValue={String(new Date().getDay())}>
              {weekTasks.map((tasks, idx) => {
                return (
                  <AccordionItem key={idx} value={String(idx + 1)}>
                    <AccordionTrigger>{getDay(idx + 1)}</AccordionTrigger>
                    <Tasks tasks={tasks} />
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
