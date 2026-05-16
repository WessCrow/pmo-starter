import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-zds-blue-400 text-zds-neutral-1000 hover:bg-zds-blue-300",
        secondary:
          "border-transparent bg-zds-blue-700 text-zds-blue-200 hover:bg-zds-blue-600",
        destructive:
          "border-transparent bg-zds-red-400 text-zds-neutral-1000 hover:bg-zds-red-300",
        outline: "text-zds-neutral-400 border-zds-neutral-700 hover:bg-zds-neutral-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
