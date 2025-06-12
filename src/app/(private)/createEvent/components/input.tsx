// input.tsx

import { twMerge } from 'tailwind-merge'
import { ComponentProps } from 'react'

export function InputRoot({ className, ...props }: ComponentProps<'div'>) {
  return <div className={twMerge("flex items-center gap-3", className)} {...props} />
}

export function InputIcon({ className, ...props }: ComponentProps<'div'>) {
  return <div className={twMerge("text-gray-200", className)} {...props} />
}

export function InputField({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={twMerge("bg-transparent flex-1 outline-none border-0 text-sm text-gray-100", className)}
      {...props}
    />
  )
}
