import { Separator } from '@/ui/separator'

export default function SkeletonTasks() {
  return (
    <div className="text-sm flex-wrap p-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="mr-2 mb-2">
          <div className="h-4 w-full rounded-sm" />
          <div className="h-4 w-full rounded-sm" />
          <Separator className="my-2" />
        </div>
      ))}
    </div>
  )
}
