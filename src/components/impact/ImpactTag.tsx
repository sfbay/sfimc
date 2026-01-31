import { cn } from '@/lib/utils'

type ImpactType = 'policy' | 'accountability' | 'resources' | 'recognition' | 'community'

const impactConfig: Record<ImpactType, { label: string; className: string }> = {
  policy: {
    label: 'Policy Changed',
    className: 'impact-tag-policy',
  },
  accountability: {
    label: 'Accountability',
    className: 'impact-tag-accountability',
  },
  resources: {
    label: 'Resources Connected',
    className: 'impact-tag-resources',
  },
  recognition: {
    label: 'Award/Recognition',
    className: 'impact-tag-recognition',
  },
  community: {
    label: 'Community Response',
    className: 'impact-tag-community',
  },
}

interface ImpactTagProps {
  type: ImpactType
  dark?: boolean
  className?: string
}

export function ImpactTag({ type, dark = false, className }: ImpactTagProps) {
  const config = impactConfig[type]

  return (
    <span className={cn('impact-tag', config.className, dark && 'impact-tag-dark', className)}>
      {config.label}
    </span>
  )
}

export type { ImpactType }
