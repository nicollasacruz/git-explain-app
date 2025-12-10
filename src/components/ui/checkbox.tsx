import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          'h-4 w-4 rounded border border-[#4a5568] bg-[#0d1117] text-[#d69e2e] focus:ring-2 focus:ring-[#d69e2e] focus:ring-offset-2 focus:ring-offset-[#1a365d] transition-colors',
          className
        )}
        {...props}
      />
    )
  }
)

Checkbox.displayName = 'Checkbox'
