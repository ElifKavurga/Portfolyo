import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fetchProjects } from '../api/projects'
import {
  getWebFallbackProjects,
  isWebProject,
  mergeWebProjectData,
  webOrbPositions,
} from '../data/webProjectDetails'

function MonitorScreen({ project }) {
  return (
    <motion.div
      key={project.key}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="absolute inset-0 flex flex-col bg-[#05080a]"
    >
      <div className="relative h-[45%] w-full shrink-0 overflow-hidden bg-[#0f172a]">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-primary/30">{project.icon}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.02]" />
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto p-5 md:p-6">
        <h3 className="mb-1 font-display text-headline-lg-mobile text-on-surface">{project.title}</h3>
        <p className="mb-3 text-sm text-primary">{project.subtitle}</p>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-on-surface-variant">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-outline-variant bg-primary/10 px-2 py-1 font-label text-[10px] text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 self-start rounded border border-primary bg-primary/10 px-4 py-2 font-label text-label-md text-primary transition-all hover:bg-primary hover:text-on-primary"
        >
          GitHub&apos;da İncele
          <span className="material-symbols-outlined text-base">open_in_new</span>
        </a>
      </div>
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

        const webProjects = data.filter(isWebProject).map(mergeWebProjectData)

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
            Web Ekosistemleri
          </h2>
          <p className="mx-auto max-w-2xl font-body text-body-lg text-on-surface-variant">
            /api/projects üzerinden Web kategorisindeki interaktif platformlar ve dokümantasyon
            portalları.
          </p>
        </header>

        {loading && (
          <p className="text-center text-on-surface-variant">Web projeleri yükleniyor...</p>
        )}

        {error && (
          <p className="mb-4 text-center text-sm text-primary">
            API bağlantısı kurulamadı, PDF verileri gösteriliyor.
          </p>
        )}

        {!loading && activeProject && (
          <div className="relative mx-auto flex min-h-[720px] max-w-5xl items-center justify-center pb-16 lg:pr-56">
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
          src="/resimler/web.png"
          alt="Web projeler karakter illüstrasyonu"
          className="h-auto w-full drop-shadow-2xl"
        />
      </div>
    </section>
  )
}
