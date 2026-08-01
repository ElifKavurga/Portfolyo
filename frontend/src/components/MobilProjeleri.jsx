import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fetchProjects } from '../api/projects'
import {
  isMobileProject,
  mergeProjectData,
  mobileProjectDetails,
  orbPositions,
} from '../data/mobileProjectDetails'

const IMAGE_CACHE_VERSION = '2026-08-01-1'

function getProjectScreenshots(project) {
  const screenshots = project.screenshots?.length
    ? project.screenshots
    : project.imageUrl
      ? [project.imageUrl]
      : []

  return screenshots.map((url) =>
    url.includes('?') ? `${url}&v=${IMAGE_CACHE_VERSION}` : `${url}?v=${IMAGE_CACHE_VERSION}`,
  )
}

function ScreenshotSlider({ project }) {
  const screenshots = getProjectScreenshots(project)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [project.key])

  if (screenshots.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-primary/40">{project.icon}</span>
      </div>
    )
  }

  const showControls = screenshots.length > 1
  const goToPrevious = () => {
    setActiveIndex((index) => (index === 0 ? screenshots.length - 1 : index - 1))
  }
  const goToNext = () => {
    setActiveIndex((index) => (index === screenshots.length - 1 ? 0 : index + 1))
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.img
          key={`${project.key}-${activeIndex}`}
          src={screenshots[activeIndex]}
          alt={`${project.title} ekran görüntüsü ${activeIndex + 1}`}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="h-full w-full object-contain"
        />
      </AnimatePresence>

      {showControls && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Önceki görsel"
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Sonraki görsel"
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>

          <div className="absolute bottom-2 left-1/2 z-10 flex max-w-[80%] -translate-x-1/2 gap-1 overflow-hidden">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${index + 1}. görsel`}
                className={`h-1.5 shrink-0 rounded-full transition-all ${
                  index === activeIndex ? 'w-4 bg-primary' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

function PhoneScreen({ project }) {
  const [view, setView] = useState('intro')
  const screenshots = getProjectScreenshots(project)

  useEffect(() => {
    setView('intro')
  }, [project.key])

  return (
    <motion.div
      key={project.key}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="absolute inset-0 bg-[#020617]"
    >
      <AnimatePresence mode="wait">
        {view === 'gallery' ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col bg-[#020617] px-3 pb-3 pt-12"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setView('intro')}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-on-surface transition hover:border-primary hover:text-primary"
                aria-label="Tanıtıma dön"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
              </button>
              <span className="min-w-0 truncate font-label text-xs text-on-surface">{project.title}</span>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant bg-surface-container text-on-surface transition hover:border-primary hover:text-primary"
                aria-label="GitHub'da incele"
              >
                <span className="material-symbols-outlined text-lg">open_in_new</span>
              </a>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-[#020617]">
              <ScreenshotSlider project={project} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col overflow-y-auto p-4 pt-12"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-outline-variant bg-primary/10">
              <span className="material-symbols-outlined text-3xl text-primary">{project.icon}</span>
            </div>

            <h3 className="mb-1 font-display text-headline-lg-mobile text-on-surface">{project.title}</h3>
            <p className="mb-3 text-sm text-primary">{project.subtitle}</p>
            <p className="mb-4 text-sm leading-relaxed text-on-surface-variant">{project.description}</p>

            <div className="mb-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[#1e293b] bg-primary/10 px-2 py-1 font-label text-[10px] text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-2">
              {screenshots.length > 0 && (
                <button
                  type="button"
                  onClick={() => setView('gallery')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded border border-primary-container bg-primary-container py-3 font-label text-label-md text-on-primary-container transition-all hover:brightness-110"
                >
                  Görseller
                  <span className="material-symbols-outlined text-base">photo_library</span>
                </button>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded border border-primary bg-primary/10 py-3 font-label text-label-md text-primary transition-all hover:bg-primary hover:text-on-primary"
              >
                GitHub&apos;da İncele
                <span className="material-symbols-outlined text-base">open_in_new</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ProjectOrb({ project, position, isActive, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(project.key)}
      className={`glass-orb pointer-events-auto z-20 flex cursor-pointer flex-col items-center justify-center rounded-full group ${position.size} ${position.className} ${
        isActive ? 'active' : ''
      }`}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4 + position.delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: position.delay,
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
    >
      <span
        className={`material-symbols-outlined mb-1 transition-transform group-hover:scale-110 ${
          isActive ? 'text-primary' : 'text-tertiary-container group-hover:text-primary'
        }`}
      >
        {project.icon}
      </span>
      <span
        className={`font-label text-center leading-tight ${
          isActive ? 'text-on-surface' : 'text-on-surface-variant'
        } ${position.size.includes('24') ? 'text-label-md' : 'text-[10px]'}`}
      >
        {project.title}
      </span>
    </motion.button>
  )
}

export default function MobilProjeleri() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeKey, setActiveKey] = useState('saye')

  useEffect(() => {
    let cancelled = false

    fetchProjects()
      .then((data) => {
        if (cancelled) return

        const mobile = data.filter(isMobileProject).map(mergeProjectData)

        if (mobile.length > 0) {
          setProjects(mobile)
          setActiveKey(mobile[0].key)
        } else {
          const fallback = Object.entries(mobileProjectDetails).map(([key, detail]) => ({
            key,
            ...detail,
            githubUrl: '#',
            imageUrl: null,
          }))
          setProjects(fallback)
          setActiveKey(fallback[0].key)
        }

        setError(null)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          const fallback = Object.entries(mobileProjectDetails).map(([key, detail]) => ({
            key,
            ...detail,
            githubUrl: '#',
            imageUrl: null,
          }))
          setProjects(fallback)
          setActiveKey('saye')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const activeProject = projects.find((project) => project.key === activeKey) ?? projects[0]

  return (
    <section id="mobile-projects" className="relative overflow-hidden py-stack-lg">
      <div className="mobile-projects-bg pointer-events-none absolute inset-0 -z-10 opacity-60" />

      <div className="relative mx-auto max-w-container-max px-margin-x">
        <div className="mb-stack-md text-center">
          <h2 className="mb-2 font-display text-display-lg text-on-surface">Mobil Projeler</h2>
          <p className="font-body text-body-md text-on-surface-variant">
            /api/projects üzerinden Mobil kategorisindeki projeler
          </p>
        </div>

        {loading && (
          <p className="text-center text-on-surface-variant">Mobil projeler yükleniyor...</p>
        )}

        {error && (
          <p className="mb-4 text-center text-sm text-primary">
            API bağlantısı kurulamadı, PDF verileri gösteriliyor.
          </p>
        )}

        {!loading && activeProject && (
          <div className="relative mx-auto flex min-h-[820px] items-center justify-center lg:pr-64">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[450px] w-[450px] animate-[spin_60s_linear_infinite] rounded-full border border-outline-variant/50" />
              <div className="absolute h-[700px] w-[700px] animate-[spin_90s_linear_infinite_reverse] rounded-full border border-outline-variant/30" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              {projects.map((project, index) => (
                <ProjectOrb
                  key={project.key}
                  project={project}
                  position={orbPositions[index] ?? orbPositions[0]}
                  isActive={activeKey === project.key}
                  onSelect={setActiveKey}
                />
              ))}
            </div>

            <div className="phone-mockup relative z-10 flex h-[650px] w-[320px] flex-col rounded-[2.5rem] p-3">
              <div className="absolute top-4 left-1/2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-background" />

              <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#0f172a]">
                <AnimatePresence mode="wait">
                  <PhoneScreen project={activeProject} />
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 z-0 hidden w-48 lg:block lg:w-72">
        <img
          src="/resimler/mobil.png"
          alt="Mobil projeler karakter illüstrasyonu"
          className="h-[520px] object-contain object-bottom opacity-90 drop-shadow-2xl lg:h-[600px]"
        />
      </div>
    </section>
  )
}
