import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-zds-100 border border-zds-neutral-700 bg-zds-neutral-1000 px-zds-500 py-zds-300 text-base font-medium placeholder:text-zds-neutral-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zds-blue-400/10 focus-visible:border-zds-blue-400 transition-all disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
