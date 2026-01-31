'use client'

/**
 * Skip Link Component
 * Allows keyboard users to bypass navigation and jump directly to main content.
 * Only visible on focus for screen reader and keyboard users.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      Skip to main content
    </a>
  )
}
