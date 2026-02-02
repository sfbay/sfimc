import { cn } from '@/lib/utils'
import Image from 'next/image'

export interface PublisherAvatarProps {
  /** Publisher name for fallback initial and alt text */
  name: string
  /** Logo URL - if empty, shows styled initial */
  logo?: string
  /** Brand color for fallback background (hex color) */
  color?: string
  /** Size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Additional classes */
  className?: string
}

const sizeConfig = {
  xs: { container: 'w-4 h-4', text: 'text-[8px]', imageSize: 16 },
  sm: { container: 'w-5 h-5', text: 'text-[10px]', imageSize: 20 },
  md: { container: 'w-6 h-6', text: 'text-xs', imageSize: 24 },
  lg: { container: 'w-10 h-10', text: 'text-base', imageSize: 40 },
  xl: { container: 'w-16 h-16', text: 'text-xl', imageSize: 64 },
}

/**
 * PublisherAvatar - Logo with graceful fallback to styled initial
 *
 * When logo is available: shows the image
 * When no logo: shows first letter of name on brand-colored background
 */
export function PublisherAvatar({
  name,
  logo,
  color = '#78716c',
  size = 'md',
  className,
}: PublisherAvatarProps) {
  const config = sizeConfig[size]
  const initial = name.charAt(0).toUpperCase()

  // Create a lighter tint for better contrast with white text
  const bgStyle = {
    backgroundColor: color,
  }

  if (logo) {
    return (
      <div
        className={cn(
          config.container,
          'relative rounded-md overflow-hidden bg-white flex-shrink-0',
          className
        )}
      >
        <Image
          src={logo}
          alt={`${name} logo`}
          width={config.imageSize}
          height={config.imageSize}
          className="object-contain w-full h-full"
          unoptimized={logo.startsWith('http')}
        />
      </div>
    )
  }

  // Fallback: styled initial with brand color
  return (
    <div
      className={cn(
        config.container,
        'rounded-md flex items-center justify-center flex-shrink-0',
        className
      )}
      style={bgStyle}
    >
      <span
        className={cn(
          config.text,
          'font-bold text-white leading-none'
        )}
        aria-hidden="true"
      >
        {initial}
      </span>
      <span className="sr-only">{name}</span>
    </div>
  )
}
