import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "INR"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {}
): string {
  const { currency = "USD", notation = "standard" } = options
  const numericPrice = typeof price === "string" ? parseFloat(price) : price
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    minimumFractionDigits: numericPrice % 1 === 0 ? 0 : 2,
    maximumFractionDigits: numericPrice % 1 === 0 ? 0 : 2,
  }).format(numericPrice)
}
