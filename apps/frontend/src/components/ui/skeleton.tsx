import { cn } from "@/lib/utils"
import React from "react"

interface SkeletonProps extends React.ComponentProps<"div"> {
  count?: number
}

function Skeleton({ className, count = 1, ...props }: SkeletonProps) {
  if (count === 1) {
    return (
      <div
        data-slot="skeleton"
        className={cn("bg-gray-500 animate-pulse rounded-sm", className)}
        {...props}
      />
    )
  }

  return (
    <div className="flex flex-col space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          data-slot="skeleton"
          className={cn("bg-gray-500 animate-pulse rounded-sm", className)}
          {...props}
        />
      ))}
    </div>
  )
}

export { Skeleton }
