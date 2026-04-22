'use client'

interface ObraLogoProps {
  className?: string
  size?: number
  showWordmark?: boolean
  style?: React.CSSProperties
}

export default function ObraLogo({ className = '', size = 32, showWordmark = true, style }: ObraLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Obralia" style={style}>
      {/* Mark — bolt + I-beam structural symbol */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="currentColor"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: 'var(--ob-accent)', flexShrink: 0 }}
      >
        {/* Top horizontal beam */}
        <rect x="6" y="5" width="36" height="6" rx="1" />
        {/* Top-right corner stem to bolt center */}
        <polygon points="38,11 28,11 16,26 26,26" />
        {/* Bottom-left bolt arm */}
        <polygon points="22,22 10,22 10,37 22,37" fill="none" />
        <polygon points="32,22 22,22 10,37 22,37" />
        {/* Bottom horizontal beam */}
        <rect x="6" y="37" width="36" height="6" rx="1" />
      </svg>

      {showWordmark && (
        <svg
          height={size * 0.6}
          viewBox="0 0 110 24"
          fill="currentColor"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: 'var(--ob-text-1)' }}
        >
          <text
            x="0"
            y="20"
            fontFamily="'Barlow Condensed', sans-serif"
            fontWeight="700"
            fontSize="24"
            letterSpacing="1"
          >
            OBRALIA
          </text>
        </svg>
      )}
    </span>
  )
}
