export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 2 36 11.4V28.6L20 38 4 28.6V11.4L20 2Z"
        stroke="var(--color-blue-bright)"
        strokeWidth="2"
      />
      <path
        d="M20 8 30 13.7V25.3L20 31 10 25.3V13.7L20 8Z"
        stroke="var(--color-mist-dim)"
        strokeWidth="1"
        opacity="0.5"
      />
      <path d="M22.5 12 15 22h6l-3.5 8L26 18h-6l2.5-6Z" fill="var(--color-yellow)" />
    </svg>
  )
}

export function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Logo />
      <span className="font-display font-semibold tracking-tight text-lg text-paper">
        VISION <span className="text-blue-bright">FORGE</span>
      </span>
    </span>
  )
}
