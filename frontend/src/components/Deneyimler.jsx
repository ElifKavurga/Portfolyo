import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experienceTimeline } from '../data/experienceTimeline'

const badgeStyles = {
  primary: 'bg-primary/10 text-primary',
  tertiary: 'bg-tertiary/10 text-tertiary',
  outline: 'bg-outline-variant/20 text-on-surface-variant',
}

const dotStyles = {
  primary: 'bg-primary',
  tertiary: 'bg-tertiary',
  muted: 'bg-on-surface-variant',
}

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className="relative" ref={ref}>
      <div
        className={`absolute top-4 -left-9 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-background md:-left-12 ${
          dotStyles[item.iconTone]
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'brightness(0.7)' }}
        animate={
          isInView
            ? {
                opacity: item.faded ? 0.85 : 1,
                y: 0,
                filter: 'brightness(1)',
                boxShadow: '0 0 18px rgba(173, 198, 255, 0.14)',
                borderColor: 'rgba(173, 198, 255, 0.38)',
              }
            : {}
        }
        transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
        className="timeline-card rounded-lg border border-outline-variant bg-surface-container p-3.5 transition-colors duration-300"
      >
        <div className="mb-1.5 flex flex-wrap items-start justify-between gap-2.5">
          <div>
            <span
              className={`mb-1 block font-label text-xs uppercase tracking-widest ${
                item.iconTone === 'tertiary'
                  ? 'text-tertiary'
                  : item.iconTone === 'muted'
                    ? 'text-on-surface-variant'
                    : 'text-primary'
              }`}
            >
              {item.date}
            </span>
            <h3 className="font-display text-lg font-bold leading-tight text-on-surface">
              {item.title}
            </h3>
          </div>
          <span className={`rounded-full px-2.5 py-1 font-label text-xs ${badgeStyles[item.badgeTone]}`}>
            {item.badge}
          </span>
        </div>

        <h4 className="mb-1 font-body text-sm font-medium text-on-surface-variant">
          {item.organization}
        </h4>
        <p className="font-body text-[13px] leading-relaxed text-on-surface-variant/80">
          {item.description}
        </p>
      </motion.div>
    </div>
  )
}

export default function Deneyimler() {
  return (
    <section id="experiences" className="relative py-stack-md">
      <div className="experiences-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid max-w-container-max gap-stack-md px-margin-x lg:grid-cols-[minmax(320px,0.4fr)_minmax(0,0.6fr)]">
        <aside className="w-full lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-8 max-w-xl lg:mt-44 lg:max-w-none"
          >
            <img
              src="/resimler/deneyimler.png"
              alt="Deneyimler karakter illüstrasyonu"
              className="mx-auto h-auto max-h-[72vh] w-full scale-110 object-contain drop-shadow-[0_0_50px_rgba(173,198,255,0.2)]"
            />
            <div className="absolute -z-10 top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
          </motion.div>
        </aside>

        <div className="w-full">
          <header className="mb-8">
            <h2 className="mb-3 font-display text-display-lg text-on-surface">
              Deneyimler & <span className="text-primary">Başarılar</span>
            </h2>
            <p className="max-w-2xl font-body text-body-md leading-relaxed text-on-surface-variant">
              Bugüne kadar bana yeni deneyimler kazandıran stajlar, projeler, yarışmalar ve topluluk
              çalışmalarım.
            </p>
          </header>

          <div className="relative pl-7 md:pl-10">
            <div className="timeline-line absolute top-0 left-0 h-full w-px" />

            <div className="space-y-4">
              {experienceTimeline.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
