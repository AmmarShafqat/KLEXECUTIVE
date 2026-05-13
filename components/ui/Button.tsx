import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'link' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  withArrow?: boolean
  children: React.ReactNode
  className?: string
  'aria-label'?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
}

const variants = {
  primary: 'btn btn-primary',
  ghost: 'btn btn-ghost',
  link: 'btn-link',
  secondary: 'btn btn-primary',
  outline: 'btn btn-ghost',
}

const sizes = {
  sm: 'text-xs px-4 py-3',
  md: '',
  lg: 'text-sm px-7 py-4',
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  children,
  className,
  'aria-label': ariaLabel,
  target,
  rel,
  type = 'button',
}: ButtonProps) {
  const styles = cn(
    variants[variant],
    size !== 'md' ? sizes[size] : '',
    className
  )

  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          size={13}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={cn(styles, 'group')}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(styles, 'group')}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  )
}
