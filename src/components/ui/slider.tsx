import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps {
  min?: number
  max?: number
  step?: number
  value?: number[]
  onValueChange?: (value: number[]) => void
  className?: string
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, value = [50], onValueChange, disabled = false }, ref) => {
    const [currentValue, setCurrentValue] = React.useState(value[0])
    const percentage = ((currentValue - min) / (max - min)) * 100

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value)
      setCurrentValue(newValue)
      onValueChange?.([newValue])
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className="absolute h-2 w-full cursor-pointer opacity-0"
        />
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div 
            className="absolute h-full bg-primary transition-all" 
            style={{ width: percentage + "%" }}
          />
        </div>
        <div 
          className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background shadow-sm"
          style={{ 
            left: "calc(" + percentage + "% - 0.625rem)",
            pointerEvents: "none"
          }}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
