import { scrollToContact } from '../utils/scrollToContact'

export default function Giris() {
  const scrollToProjects = () => {
    document.getElementById('web-projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-container-max flex-col items-center gap-gutter px-margin-x py-stack-lg md:grid md:grid-cols-12">
      <div className="flex flex-col gap-stack-md text-left md:col-span-7">
        <div className="flex items-center gap-2 font-label text-label-md text-primary">
          <span className="h-px w-8 bg-primary" />
          <span>YENİ PROJELER İÇİN MÜSAİT</span>
        </div>

        <h1 className="font-display text-display-lg tracking-tighter text-on-surface md:text-display-xl">
          Merhaba, Ben Elif Kavurga.{' '}
          <span className="text-primary">Full-Stack</span> Yazılım Geliştirici
        </h1>

        <p className="max-w-xl font-body text-body-lg text-on-surface-variant">
          Java Spring Boot, React ve Flutter teknolojileriyle uçtan uca, ölçeklenebilir dijital
          çözümler üretiyorum.
        </p>

        <div className="mt-stack-sm flex flex-wrap gap-stack-sm">
          <button
            type="button"
            onClick={scrollToProjects}
            className="glow-effect flex items-center gap-2 rounded-lg bg-primary-container px-stack-lg py-4 font-label text-label-md text-on-primary-container transition-all hover:brightness-110 active:scale-95"
          >
            Projelerimi Keşfet
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>

          <button
            type="button"
            onClick={scrollToContact}
            className="rounded-lg border border-outline-variant px-stack-lg py-4 font-label text-label-md text-on-surface transition-all hover:bg-surface-container-low active:scale-95"
          >
            Benimle İletişime Geç
          </button>
        </div>
      </div>

      <div className="relative mt-stack-lg flex w-full items-end justify-center md:col-span-5 md:mt-0">
        <div className="absolute -z-10 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="relative flex aspect-[2/3] w-full max-w-[450px] items-end">
          <img
            src="/resimler/selamlayan.png"
            alt="Elif Kavurga selamlayan portre illüstrasyonu"
            className="h-auto w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
