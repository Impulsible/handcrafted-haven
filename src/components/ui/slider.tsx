import * as React from "react"

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number[];
  onValueChange?: (value: number[]) => void;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = [0, 100], onValueChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value);
      if (value.length === 2) {
        onValueChange?.([value[0], newValue]);
      } else {
        onValueChange?.([newValue]);
      }
    };

    return (
      <div className="relative">
        <input
          type="range"
          ref={ref}
          value={value[1]}
          onChange={handleChange}
          className={`h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary ${className || ''}`}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
