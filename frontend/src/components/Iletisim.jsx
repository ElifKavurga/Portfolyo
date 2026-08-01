import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sendContactMessage } from '../api/contact'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/elifkavurga',
    icon: 'work',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ElifKavurga',
    icon: 'code',
  },
  {
    label: 'E-posta',
    href: 'mailto:elifkvrg@gmail.com',
    icon: 'mail',
  },
]

export default function Iletisim() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [toastVisible, setToastVisible] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await sendContactMessage(form)
      setForm({ name: '', email: '', message: '' })
      setToastVisible(true)
      window.setTimeout(() => setToastVisible(false), 4000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-stack-lg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(173,198,255,0.08)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-container-max px-margin-x">
        <header className="mb-stack-md text-center">
          <h2 className="mb-2 font-display text-display-lg text-on-surface">İletişim</h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Proje fikirleri, iş birlikleri veya sorularınız için formu doldurun.
          </p>
        </header>

        <div className="grid gap-gutter lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="glass-card rounded-xl p-stack-md">
            <div className="mb-stack-sm">
              <label htmlFor="name" className="mb-2 block font-label text-label-md text-on-surface">
                Ad
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Adınız Soyadınız"
                className="contact-input w-full rounded-lg border border-outline-variant/60 bg-background/40 px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="mb-stack-sm">
              <label htmlFor="email" className="mb-2 block font-label text-label-md text-on-surface">
                E-posta
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="ornek@email.com"
                className="contact-input w-full rounded-lg border border-outline-variant/60 bg-background/40 px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="mb-stack-md">
              <label htmlFor="message" className="mb-2 block font-label text-label-md text-on-surface">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Mesajınızı yazın..."
                className="contact-input w-full resize-none rounded-lg border border-outline-variant/60 bg-background/40 px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary"
              />
            </div>

            {error && (
              <p className="mb-stack-sm text-sm text-error">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="glow-effect flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-stack-lg py-4 font-label text-label-md text-on-primary-container transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95"
            >
              {loading ? 'Gönderiliyor...' : 'Gönder'}
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>

          <div className="glass-card rounded-xl p-stack-md">
            <div>
              <h3 className="mb-3 font-display text-headline-lg-mobile text-on-surface">
                Bağlantılar
              </h3>
              <p className="font-body text-body-md leading-relaxed text-on-surface-variant">
                Formu doldurarak doğrudan mesaj gönderebilir veya aşağıdaki kanallardan bana
                ulaşabilirsiniz.
              </p>

              <ul className="mt-stack-md space-y-stack-sm">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="group flex items-center gap-4 rounded-lg border border-outline-variant/50 bg-background/30 px-4 py-3 transition-all hover:border-primary hover:bg-primary/5"
                    >
                      <span className="material-symbols-outlined text-2xl text-primary transition-transform group-hover:scale-110">
                        {link.icon}
                      </span>
                      <div>
                        <p className="font-label text-label-md text-on-surface">{link.label}</p>
                        <p className="text-sm text-on-surface-variant">{link.href.replace('mailto:', '')}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed bottom-8 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-full border border-primary/30 bg-surface-container/90 px-6 py-3 shadow-[0_0_30px_rgba(173,198,255,0.25)] backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-primary">check_circle</span>
            <span className="font-label text-label-md text-on-surface">Mesajınız iletildi</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
