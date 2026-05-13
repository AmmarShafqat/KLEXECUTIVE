interface SectionHeadingProps {
  tag: string
  title: React.ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'mx-auto text-center items-center max-w-2xl' : 'items-start'
      }`}
    >
      <div
        className={`mb-5 ${isCenter ? 'eyebrow-center' : 'eyebrow'}`}
        style={{ color: light ? 'rgba(255,255,255,0.6)' : undefined }}
      >
        {tag}
      </div>

      <h2
        className="font-display leading-tight mb-4"
        style={{
          fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
          color: light ? '#ffffff' : 'var(--ink)',
          fontWeight: 500,
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="text-base md:text-lg leading-relaxed font-light max-w-xl"
          style={{ color: light ? 'rgba(255,255,255,0.55)' : 'var(--ink-3)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
