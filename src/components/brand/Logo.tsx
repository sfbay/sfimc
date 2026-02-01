import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * SFIMC Logo - SF city silhouette with "sf" inside, followed by "imc"
 * Uses the official brand logo image
 */
export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: { height: 24, width: 62 },
    md: { height: 32, width: 82 },
    lg: { height: 48, width: 124 },
  }

  const { height, width } = sizes[size]

  return (
    <Image
      src="/images/sfimc-logo.png"
      alt="SF IMC"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
