import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'new' | 'discount' | 'default'
  className?: string
}

const variants = {
  new: 'bg-accent text-white',
  discount: 'bg-primary text-white',
  default: 'bg-zinc-700 text-zinc-200',
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded-md text-xs font-space font-bold uppercase tracking-wide
        ${variants[variant]} ${className}
      `}
    >
      {children}
    </span>
  )
}
