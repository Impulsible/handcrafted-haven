import * as React from "react"

// Corrected interface - DON'T extend InputHTMLAttributes
interface SliderProps {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ 
    value = [0], 
    onValueChange, 
    min = 0, 
    max = 100, 
    step = 1, 
    className = "", 
    disabled = false,
    ...props 
  }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [parseFloat(event.target.value)];
      onValueChange?.(newValue);
    };

    return (
      <input
        ref={ref}
        type="range"
        value={value[0] || 0}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        {...props}
      />
    );
  }
)

Slider.displayName = "Slider"

export { Slider }