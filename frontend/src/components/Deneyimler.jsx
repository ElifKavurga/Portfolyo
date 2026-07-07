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
        className={`absolute top-4 -left-10 z-10 h-4 w-4 rounded-full border-4 border-background md:-left-14 ${
          dotStyles[item.iconTone]
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'brightness(0.7)' }}
        animate={
          isInView
            ? {
                opacity: item.faded ? 0.85 : 1,
                y: 0,
                filter: 'brightness(1)',
                boxShadow: '0 0 24px rgba(173, 198, 255, 0.18)',
                borderColor: 'rgba(173, 198, 255, 0.45)',
              }
            : {}
        }
        transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
        className="timeline-card rounded-lg border border-outline-variant bg-surface-container p-6 transition-colors duration-300"
      >
        <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span
              className={`mb-1 block font-label text-label-md uppercase tracking-widest ${
                item.iconTone === 'tertiary'
                  ? 'text-tertiary'
                  : item.iconTone === 'muted'
                    ? 'text-on-surface-variant'
                    : 'text-primary'
              }`}
            >
              {item.date}
            </span>
            <h3 className="font-display text-headline-lg text-on-surface">{item.title}</h3>
          </div>
          <span
            className={`rounded-full px-3 py-1 font-label text-label-md ${badgeStyles[item.badgeTone]}`}
          >
            {item.badge}
          </span>
        </div>

        <h4 className="mb-2 font-body text-body-lg text-on-surface-variant">{item.organization}</h4>
        <p className="font-body text-body-md leading-relaxed text-on-surface-variant/80">
          {item.description}
        </p>
      </motion.div>
    </div>
  )
}

export default function Deneyimler() {
  return (
    <section id="experiences" className="relative py-stack-lg">
      <div className="experiences-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex max-w-container-max flex-col items-start gap-16 px-margin-x lg:flex-row">
        <div className="sticky top-32 w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <img
              src="/resimler/deneyimler.png"
              alt="Deneyimler karakter illüstrasyonu"
              className="animate-float h-auto w-full max-h-[85vh] object-contain drop-shadow-[0_0_50px_rgba(173,198,255,0.2)]"
            />
            <div className="absolute -z-10 top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <header className="mb-12">
            <h2 className="mb-4 font-display text-display-lg text-on-surface">
              Deneyimler & <span className="text-primary">Başarılar</span>
            </h2>
            <p className="max-w-lg font-body text-body-lg text-on-surface-variant">
              Organizasyonel deneyimler, hackathon başarıları, eğitim yolculuğu ve teknik programlardan
              oluşan kronolojik gelişim çizelgem.
            </p>
          </header>

          <div className="relative pl-8 md:pl-12">
            <div className="timeline-line absolute top-0 left-0 h-full w-px" />

            <div className="space-y-stack-md">
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
