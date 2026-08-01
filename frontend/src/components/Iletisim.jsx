function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9" fill="none">
      <path
        d="M4.75 6.75h14.5v10.5H4.75V6.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m5.25 7.25 6.75 5 6.75-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9" fill="none">
      <path
        d="M6.5 10v7M6.5 6.75v.05M10.5 17v-7M10.5 12.7c.45-1.75 1.62-3 3.45-3 2.15 0 3.85 1.5 3.85 4.55V17"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-9 w-9" fill="none">
      <path
        d="M9.25 18.75c-4.05 1.25-4.05-1.9-5.75-2.25M14.75 21v-3.15c0-.85.1-1.35-.4-1.85 2.45-.28 5.15-1.2 5.15-5.45 0-1.15-.4-2.15-1.1-2.95.12-.28.5-1.45-.1-2.95 0 0-.9-.3-3 1.1a10.4 10.4 0 0 0-5.5 0c-2.1-1.4-3-1.1-3-1.1-.6 1.5-.22 2.67-.1 2.95a4.3 4.3 0 0 0-1.1 2.95c0 4.2 2.68 5.18 5.13 5.45-.32.28-.58.78-.68 1.5"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const contactCards = [
  {
    title: 'E-posta',
    value: 'elifkvrg@gmail.com',
    href: 'mailto:elifkvrg@gmail.com',
    icon: MailIcon,
    external: false,
  },
  {
    title: 'LinkedIn',
    value: 'linkedin.com/in/elifkavurga',
    href: 'https://www.linkedin.com/in/elifkavurga',
    icon: LinkedInIcon,
    external: true,
  },
  {
    title: 'GitHub',
    value: 'github.com/ElifKavurga',
    href: 'https://github.com/ElifKavurga',
    icon: GitHubIcon,
    external: true,
  },
]

export default function Iletisim() {
  return (
    <section id="contact" className="relative py-stack-md">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(173,198,255,0.07)_0%,_transparent_68%)]" />

      <div className="relative mx-auto max-w-container-max px-margin-x">
        <header className="mx-auto mb-stack-md max-w-3xl text-center">
          <h2 className="mb-2 font-display text-display-lg text-on-surface">İletişim</h2>
          <p className="font-body text-body-md leading-relaxed text-on-surface-variant">
            Yeni bir proje, staj fırsatı veya iş birliği hakkında konuşmak istersen benimle
            aşağıdaki kanallardan iletişime geçebilirsin.
          </p>
        </header>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3 lg:gap-6">
          {contactCards.map((card) => {
            const Icon = card.icon

            return (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noreferrer' : undefined}
                className="group flex min-h-[150px] flex-col justify-center rounded-xl border border-outline-variant/70 bg-surface-container/70 p-4 transition-all duration-250 hover:-translate-y-1 hover:border-primary/80 hover:bg-surface-container-high hover:shadow-[0_0_24px_rgba(173,198,255,0.16)]"
              >
                <span className="mb-3 flex items-center gap-3">
                  <span className="text-primary transition-transform duration-250 group-hover:scale-110">
                    <Icon />
                  </span>
                  <span className="font-display text-xl font-bold text-on-surface">{card.title}</span>
                </span>

                <span className="break-words font-body text-sm text-on-surface-variant">
                  {card.value}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
