export function StatsBar() {
  const stats = [
    { value: '11', label: 'Member Publications' },
    { value: '50%', label: 'City Ad Spend to Community Media' },
    { value: '500K+', label: 'Bay Area Readers Reached' },
    { value: '100+', label: 'Years Combined Experience' },
  ]

  return (
    <section className="border-b border-[var(--color-mist)] bg-[var(--color-paper)]">
      <div className="container py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold text-[var(--color-ink)] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-warm-gray)] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
