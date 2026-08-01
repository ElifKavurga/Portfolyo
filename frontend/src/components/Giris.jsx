import { scrollToContact } from '../utils/scrollToContact'
import { publicAsset } from '../utils/assetPath'

export default function Giris() {
  const scrollToProjects = () => {
    document.getElementById('web-projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-container-max items-center gap-stack-lg px-margin-x py-stack-lg md:grid-cols-12">
      <div className="flex flex-col gap-stack-md text-left md:col-span-7">
        <div className="flex items-center gap-2 font-label text-label-md text-primary">
          <span className="h-px w-8 bg-primary" />
          <span>JAVA • REACT • FLUTTER</span>
        </div>

        <div className="space-y-stack-sm">
          <h1 className="max-w-4xl font-display text-display-lg tracking-tighter text-on-surface md:text-display-xl">
            Merhaba, Ben Elif Kavurga.
          </h1>
          <p className="font-display text-headline-lg-mobile text-primary md:text-headline-lg">
            Full-Stack Yazılım Geliştiricisi
          </p>
        </div>

        <p className="max-w-2xl font-body text-body-lg text-on-surface-variant">
          Yazılım geliştirmeyi yalnızca kod yazmak değil, gerçek problemlere çözüm üretmek olarak
          görüyorum. Java Spring Boot, React ve Flutter ile web ve mobil uygulamalar geliştiriyor;
          öğrendiklerimi her projede biraz daha ileri taşımaya çalışıyorum.
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

      <div className="relative mt-stack-md flex w-full items-end justify-center md:col-span-5 md:mt-0">
        <div className="absolute -z-10 bottom-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="relative flex aspect-[2/3] w-full max-w-[440px] items-end">
          <img
            src={publicAsset('resimler/selamlayan.png')}
            alt="Elif Kavurga selamlayan portre illüstrasyonu"
            className="h-auto w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
