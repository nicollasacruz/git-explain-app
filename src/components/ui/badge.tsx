'use client'

import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'
import { TipoCommit, TipoBranch } from '@/types'

const commitColors: Record<TipoCommit, string> = {
  feat: 'bg-[#38a169] text-white',
  fix: 'bg-[#e53e3e] text-white',
  docs: 'bg-[#3182ce] text-white',
  style: 'bg-[#9f7aea] text-white',
  refactor: 'bg-[#ed8936] text-white',
  test: 'bg-[#38b2ac] text-white',
  chore: 'bg-[#718096] text-white',
  perf: 'bg-[#d69e2e] text-[#1a365d]',
  ci: 'bg-[#667eea] text-white',
  build: 'bg-[#ed64a6] text-white'
}

const branchColors: Record<TipoBranch, string> = {
  master: 'bg-[#e53e3e] text-white',
  develop: 'bg-[#ed8936] text-white',
  feature: 'bg-[#38a169] text-white',
  release: 'bg-[#d69e2e] text-[#1a365d]',
  hotfix: 'bg-[#e53e3e] text-white'
}

export interface CommitBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tipo: TipoCommit
}

const CommitBadge = forwardRef<HTMLSpanElement, CommitBadgeProps>(
  ({ className, tipo, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase',
          commitColors[tipo],
          className
        )}
        {...props}
      >
        {tipo}
      </span>
    )
  }
)

CommitBadge.displayName = 'CommitBadge'

export interface BranchBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tipo: TipoBranch
  nome?: string
}

const BranchBadge = forwardRef<HTMLSpanElement, BranchBadgeProps>(
  ({ className, tipo, nome, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono',
          branchColors[tipo],
          className
        )}
        {...props}
      >
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
          <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.492 2.492 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
        </svg>
        {nome || tipo}
      </span>
    )
  }
)

BranchBadge.displayName = 'BranchBadge'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-[#2c5282] text-white',
      success: 'bg-[#38a169] text-white',
      warning: 'bg-[#d69e2e] text-[#1a365d]',
      error: 'bg-[#e53e3e] text-white',
      info: 'bg-[#3182ce] text-white'
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { CommitBadge, BranchBadge, Badge }
