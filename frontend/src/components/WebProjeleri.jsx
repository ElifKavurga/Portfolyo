import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fetchProjects } from '../api/projects'
import {
  getWebFallbackProjects,
  isWebProject,
  mergeWebProjectData,
  sortWebProjects,
  webOrbPositions,
} from '../data/webProjectDetails'
import { publicAsset } from '../utils/assetPath'

const IMAGE_CACHE_VERSION = '2026-08-01-1'

function getProjectScreenshots(project) {
  const screenshots = project.screenshots?.length
    ? project.screenshots
    : project.imageUrl
      ? [project.imageUrl]
      : []

  return screenshots.map((url) => {
    const assetUrl = publicAsset(url)
    return assetUrl.includes('?')
      ? `${assetUrl}&v=${IMAGE_CACHE_VERSION}`
      : `${assetUrl}?v=${IMAGE_CACHE_VERSION}`
  })
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
        <span className="material-symbols-outlined text-6xl text-primary/30">{project.icon}</span>
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
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
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
            className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
          >
            <span className="material-symbols-outlined text-xl">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Sonraki görsel"
            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:bg-black/75"
          >
            <span className="material-symbols-outlined text-xl">chevron_right</span>
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex max-w-[85%] -translate-x-1/2 gap-1.5 overflow-hidden">
            {screenshots.map((screenshot, index) => (
              <button
                key={screenshot}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${index + 1}. görsel`}
                className={`h-1.5 shrink-0 rounded-full transition-all ${
                  index === activeIndex ? 'w-5 bg-primary' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

function MonitorScreen({ project }) {
  const [view, setView] = useState('intro')
  const screenshots = getProjectScreenshots(project)

  useEffect(() => {
    setView('intro')
  }, [project.key])

  return (
    <motion.div
      key={project.key}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="absolute inset-0 bg-[#05080a]"
    >
      <AnimatePresence mode="wait">
        {view === 'gallery' ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col bg-[#020617]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-outline-variant/60 px-4 py-3">
              <button
                type="button"
                onClick={() => setView('intro')}
                className="inline-flex items-center gap-2 rounded border border-outline-variant bg-surface-container px-3 py-2 font-label text-xs text-on-surface transition hover:border-primary hover:text-primary"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Tanıtım
              </button>
              <span className="min-w-0 truncate font-label text-sm text-on-surface">{project.title}</span>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-outline-variant bg-surface-container px-3 py-2 font-label text-xs text-on-surface transition hover:border-primary hover:text-primary"
              >
                GitHub
                <span className="material-symbols-outlined text-base">open_in_new</span>
              </a>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden bg-[#020617]">
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
            className="absolute inset-0 flex flex-col overflow-y-auto p-6 md:p-8"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-lg border border-outline-variant bg-primary/10">
              <span className="material-symbols-outlined text-4xl text-primary">{project.icon}</span>
            </div>

            <h3 className="mb-2 font-display text-headline-lg text-on-surface">{project.title}</h3>
            <p className="mb-5 text-base text-primary">{project.subtitle}</p>
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-on-surface-variant md:text-base">
              {project.description}
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-outline-variant bg-primary/10 px-2 py-1 font-label text-[10px] text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              {screenshots.length > 0 && (
                <button
                  type="button"
                  onClick={() => setView('gallery')}
                  className="inline-flex items-center gap-2 rounded border border-primary bg-primary px-4 py-2 font-label text-label-md text-on-primary transition hover:brightness-110"
                >
                  Görseller
                  <span className="material-symbols-outlined text-base">photo_library</span>
                </button>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-primary bg-primary/10 px-4 py-2 font-label text-label-md text-primary transition-all hover:bg-primary hover:text-on-primary"
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

function ProjectPill({ project, position, isActive, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(project.key)}
      className={`pointer-events-auto z-30 focus:outline-none ${position.className}`}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 5 + position.delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: position.delay,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        className={`flex items-center gap-3 rounded-full border py-2 px-4 shadow-[0_0_20px_rgba(173,198,255,0.1)] transition-all duration-300 ${
          isActive
            ? 'border-primary bg-surface-container-high shadow-[0_0_30px_rgba(173,198,255,0.2)]'
            : 'border-outline-variant bg-surface-container opacity-80 hover:border-primary hover:opacity-100'
        }`}
      >
        <span
          className={`material-symbols-outlined text-xl ${
            isActive ? 'text-primary' : 'text-secondary group-hover:text-primary'
          }`}
        >
          {project.icon}
        </span>
        <span
          className={`font-label text-label-md whitespace-nowrap ${
            isActive ? 'text-primary' : 'text-on-surface'
          }`}
        >
          {project.title}
        </span>
      </div>
    </motion.button>
  )
}

export default function WebProjeleri() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeKey, setActiveKey] = useState('jakartamora')

  useEffect(() => {
    let cancelled = false

    fetchProjects()
      .then((data) => {
        if (cancelled) return

        const webProjects = sortWebProjects(data.filter(isWebProject).map(mergeWebProjectData))

        if (webProjects.length > 0) {
          setProjects(webProjects)
          setActiveKey(webProjects[0].key)
        } else {
          const fallback = getWebFallbackProjects()
          setProjects(fallback)
          setActiveKey(fallback[0].key)
        }

        setError(null)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
          const fallback = getWebFallbackProjects()
          setProjects(fallback)
          setActiveKey('jakartamora')
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
    <section id="web-projects" className="relative overflow-hidden py-stack-lg">
      <div className="web-projects-bg pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto max-w-container-max px-margin-x">
        <header className="mb-stack-lg text-center">
          <h2 className="mb-stack-sm font-display text-display-lg tracking-tight text-on-surface">
            Web Projelerim
          </h2>
        </header>

        {loading && (
          <p className="text-center text-on-surface-variant">Web projeleri yükleniyor...</p>
        )}

        {error && (
          <p className="mb-4 text-center text-sm text-primary">
            API bağlantısı kurulamadı, yerel proje verileri gösteriliyor.
          </p>
        )}

        {!loading && activeProject && (
          <div className="relative mx-auto flex min-h-[720px] max-w-6xl items-center justify-center pb-16 lg:px-32">
            {projects.map((project, index) => (
              <ProjectPill
                key={project.key}
                project={project}
                position={webOrbPositions[index] ?? webOrbPositions[0]}
                isActive={activeKey === project.key}
                onSelect={setActiveKey}
              />
            ))}

            <div className="monitor-mockup relative z-20 flex aspect-[16/10] w-[90%] max-w-[800px] flex-col rounded-xl border border-outline-variant bg-surface-container-highest p-3 md:p-4 shadow-2xl">
              <div className="mb-2 flex h-2 w-full items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-outline-variant" />
              </div>

              <div className="relative flex-grow overflow-hidden rounded-lg border border-surface-container bg-[#05080a]">
                <AnimatePresence mode="wait">
                  <MonitorScreen project={activeProject} />
                </AnimatePresence>
              </div>

              <div className="absolute -bottom-8 left-1/2 z-[-1] h-8 w-32 -translate-x-1/2 rounded-b-md border border-t-0 border-outline-variant bg-surface-container-highest" />
              <div className="absolute -bottom-10 left-1/2 z-[-1] h-2 w-48 -translate-x-1/2 rounded-full border border-outline-variant bg-surface-container-high" />
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 z-0 hidden w-40 md:block md:w-56 lg:w-64">
        <img
          src={publicAsset('resimler/web.png')}
          alt="Web projeler karakter illüstrasyonu"
          className="h-auto w-full drop-shadow-2xl"
        />
      </div>
    </section>
  )
}
