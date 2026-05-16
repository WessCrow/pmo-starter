import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-zds-100 border border-zds-neutral-700 bg-zds-neutral-1000 px-zds-500 py-zds-400 text-base font-medium placeholder:text-zds-neutral-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zds-blue-400/10 focus-visible:border-zds-blue-400 transition-all disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
