import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const getVariantStyles = () => {
      switch(variant) {
        case "destructive": return "bg-red-600 text-white hover:bg-red-700"
        case "outline": return "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        case "secondary": return "bg-gray-200 text-gray-900 hover:bg-gray-300"
        case "ghost": return "text-gray-700 hover:bg-gray-100"
        case "link": return "text-blue-600 underline hover:text-blue-700"
        default: return "bg-blue-600 text-white hover:bg-blue-700"
      }
    }
    
    const getSizeStyles = () => {
      switch(size) {
        case "sm": return "h-8 px-3 text-sm"
        case "lg": return "h-12 px-6 text-lg"
        case "icon": return "h-10 w-10"
        default: return "h-10 px-4 py-2"
      }
    }

    const classes = [
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      getVariantStyles(),
      getSizeStyles(),
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
