import Giris from './components/Giris'
import Hakkimda from './components/Hakkimda'
import Yetenekler from './components/Yetenekler'
import WebProjeleri from './components/WebProjeleri'
import MobilProjeleri from './components/MobilProjeleri'
import Deneyimler from './components/Deneyimler'
import Iletisim from './components/Iletisim'

export default function App() {
  return (
    <div className="relative min-h-screen bg-background text-on-surface">
      <div className="pointer-events-none absolute inset-0 tech-grid" />

      <nav className="fixed top-0 z-50 w-full border-b border-outline-variant bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-container-max items-center justify-between px-margin-x">
          <a href="#" className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-on-surface">
              Elif Kavurga
            </span>
            <span className="mt-1 h-px w-full bg-primary/70" />
            <span className="mt-1 font-label text-[10px] uppercase tracking-widest text-primary">
              Full-Stack Developer
            </span>
          </a>

          <div className="hidden items-center gap-stack-md font-label text-label-md md:flex">
            <a href="#web-projects" className="text-on-surface-variant transition-colors hover:text-on-surface">
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
        <Iletisim />
      </main>
    </div>
  )
}
