import useTaskActions, { actionState } from '@/hook/useTaskActions'
import { ScrollArea } from '@/ui/scroll-area'
import AddTask from '@/components/AddTask'
import SkeletonTasks from './SkeletonTasks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion'
import Tasks from './TaskList'
import { ReactNode } from 'react'
import { getLongMonthDay, getLongDay } from '@/lib/utils'
const bgDays = {
  0: 'bg-secondary/0',
  1: 'bg-secondary/10',
  2: 'bg-secondary/15',
  3: 'bg-secondary/25',
  4: 'bg-secondary/40',
  5: 'bg-secondary/50',
  6: 'bg-secondary/60',
} as Record<number, string>

const currentDay = String(new Date().getDay())

export default function WeekTasksList() {
  const { weekTasks, writeTask, actionState } = useTaskActions()

  return (
    <div className=" flex flex-col flex-1 overflow-hidden border-none">
      <ScrollArea className="border-none w-full flex-1 rounded-lg border">
        <div className="text-sm flex-wrap">
          {
            <Accordion type="single" className="pt-[2.8rem]" collapsible defaultValue={currentDay}>
              {weekTasks.map((_, idx, arrTasks) => {
                //start from monday
                const normalizedDay = idx === 6 ? 0 : idx + 1
                const normalizedTask = arrTasks[normalizedDay]
                return (
                  <AccordionItem
                    key={idx}
                    value={String(normalizedDay)}
                    className={`${bgDays[idx]} border-none text-foreground/75 font-rubik pl-10 py-[1.7rem]  `}
                  >
                    <AccordionTrigger className="text-3xl font-bold uppercase scale-y-[1.1] ">
                      {getLongDay(normalizedDay)}
                    </AccordionTrigger>
                    <AccordionContent className="animate-in fade-in-0 slide-in-from-top-3/4 h-52">
                      <p className="text-sm text-foreground/70 font-light pb-4">
                        {getLongMonthDay(idx)}
                      </p>
                      <TaskContent actionState={actionState} key={idx}>
                        <Tasks tasks={normalizedTask}>
                          <p>task: {normalizedDay}</p>
                          <AddTask writeTask={writeTask} day={normalizedDay} />
                        </Tasks>
                      </TaskContent>
                    </AccordionContent>
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
  if (actionState.error) {
    return (
      <div className="animate-in fade-in-0 slide-in-from-top-3/4">
        <p className="text-rose-500/80 text-sm">
          Oops! Something went wrong. Try again. {actionState.error}
        </p>
      </div>
    )
  }
  if (actionState.loading && !actionState.error) {
    return (
      <div className="animate-in fade-in-0 slide-in-from-top-3/4">
        <SkeletonTasks />
      </div>
    )
  } else {
    return children
  }
}
