import * as React from "react";
import { cn } from "@/lib/utils";

interface ArtisanButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const ArtisanButton = React.forwardRef<HTMLButtonElement, ArtisanButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-gradient-button text-white shadow-organic hover:shadow-organic-lg': variant === 'primary',
            'bg-accent text-white shadow-sm hover:shadow-md': variant === 'secondary',
            'bg-success text-white shadow-sm hover:shadow-md': variant === 'accent',
            'border-2 border-primary/30 bg-transparent text-primary hover:bg-primary/10': variant === 'outline',
            'px-3 py-1.5 text-sm rounded-organic': size === 'sm',
            'px-6 py-3 text-base rounded-lg': size === 'md',
            'px-8 py-4 text-lg rounded-xl': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

ArtisanButton.displayName = "ArtisanButton";

export { ArtisanButton };
