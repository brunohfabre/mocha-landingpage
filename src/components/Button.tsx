import { ButtonHTMLAttributes, ReactNode } from 'react'

import { clsx } from 'clsx'

type ButtonProps = {
  children: ReactNode
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  className,
  disabled,
  isLoading,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `bg-emerald-300 h-10 px-5 text-sm ${className}`,
        !isLoading && 'hover:bg-emerald-400 cursor-pointer',
        isLoading && 'opacity-60 cursor-not-allowed',
      )}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? 'is loading' : children}
    </button>
  )
}
