import useTaskActions, { actionState } from '@/hook/useTaskActions'
import { ScrollArea } from '@/ui/scroll-area'
import AddTask from '@/components/AddTask'
import SkeletonTasks from './SkeletonTasks'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion'
import TasksList from './TaskList'
import { ReactNode } from 'react'
import { getLongMonthDay, getLongDay } from '@/lib/utils'
const bgDays = {
  0: 'bg-transparent',
  1: 'bg-secondary/5',
  2: 'bg-secondary/15',
  3: 'bg-secondary/25',
  4: 'bg-secondary/35',
  5: 'bg-secondary/45',
  6: 'bg-secondary/50',
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
                const areTasksEmpty = normalizedTask.length === 0
                return (
                  <AccordionItem
                    key={idx}
                    value={String(normalizedDay)}
                    className={`${bgDays[idx]} border-none text-foreground/75 font-rubik pl-10 py-[0.9rem]`}
                  >
                    <AccordionTrigger className="text-3xl font-bold uppercase scale-y-[1.1] py-[1.041rem] ">
                      {getLongDay(normalizedDay)}
                    </AccordionTrigger>
                    <AccordionContent className="pr-4 animate-in fade-in-0  h-52 relative">
                      <div className="h-full flex flex-col gap-1 w-full">
                        <p className="text-sm text-foreground/70 font-light pb-3 ">
                          {getLongMonthDay(idx)}
                        </p>
                        <TaskContent actionState={actionState} key={idx}>
                          <TasksList tasks={normalizedTask} />
                          <AddTask
                            writeTask={writeTask}
                            day={normalizedDay}
                            areTasksEmpty={areTasksEmpty}
                          />
                        </TaskContent>
                      </div>
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
      <div className="animate-in fade-in-0 slide-in-from-top-3/4 h-full">
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
