import { Separator } from '@/ui/separator'
import { Skeleton } from '../ui/skeleton'

export default function SkeletonTasks() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton className="w-full h-4" key={i} />
      ))}
    </div>
  )
}
