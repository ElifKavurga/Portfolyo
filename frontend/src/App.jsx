import { useProjects } from './hooks/useProjects'
import ProjectCard from './components/ProjectCard'
import Giris from './components/Giris'
import Hakkimda from './components/Hakkimda'
import Yetenekler from './components/Yetenekler'
import WebProjeleri from './components/WebProjeleri'
import MobilProjeleri from './components/MobilProjeleri'
import Deneyimler from './components/Deneyimler'

export default function App() {
  const { projects, loading, error } = useProjects()

  return (
    <div className="relative min-h-screen bg-background text-on-surface">
      <div className="pointer-events-none absolute inset-0 tech-grid" />

      <nav className="fixed top-0 z-50 w-full border-b border-outline-variant bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-x">
          <div className="text-xl font-bold tracking-tighter">DevPortfolio</div>
          <div className="hidden items-center gap-stack-md font-label text-label-md md:flex">
            <a href="#projects" className="text-on-surface-variant transition-colors hover:text-on-surface">
              Projeler
            </a>
            <a href="#about" className="text-on-surface-variant transition-colors hover:text-on-surface">
              Hakkımda
            </a>
            <a href="#skills" className="text-on-surface-variant transition-colors hover:text-on-surface">
              Yetenekler
            </a>
            <a href="#experiences" className="text-on-surface-variant transition-colors hover:text-on-surface">
              Deneyimler
            </a>
            <a href="#contact" className="text-on-surface-variant transition-colors hover:text-on-surface">
              İletişim
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 overflow-hidden pt-20">
        <Giris />

        <Hakkimda />

        <Yetenekler />

        <WebProjeleri />

        <MobilProjeleri />

        <Deneyimler />

        <section id="projects" className="mx-auto max-w-container-max px-margin-x pb-stack-lg">
          <div className="mb-stack-md flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">Projeler</h2>
              <p className="mt-2 text-on-surface-variant">
                /api/projects endpoint&apos;inden yüklenen GitHub repoları
              </p>
            </div>
          </div>

          {loading && (
            <p className="text-on-surface-variant">Projeler yükleniyor...</p>
          )}

          {error && (
            <div className="rounded-lg border border-outline-variant bg-surface-container p-gutter text-sm">
              <p className="font-medium text-primary">Backend bağlantısı kurulamadı</p>
              <p className="mt-2 text-on-surface-variant">{error}</p>
              <p className="mt-2 text-on-surface-variant">
                Spring Boot (8080) servisinin çalıştığından emin olun.
              </p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.githubUrl} project={project} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
