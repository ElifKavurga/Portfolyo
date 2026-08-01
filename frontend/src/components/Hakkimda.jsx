import { scrollToContact } from '../utils/scrollToContact'

const education = {
  degree: 'Yazılım Mühendisliği Lisans Programı',
  university: 'İnönü Üniversitesi',
  period: 'Eylül 2023 – Devam Ediyor',
  agno: '3.31',
}

const organizationalExperience = [
  {
    role: 'Sen Geleceksin Bursiyeri',
    organization: 'T3 Vakfı',
    period: '2026 – Devam Ediyor',
  },
  {
    role: 'Yönetim Kurulu Üyesi',
    organization: 'İnönü Teknofest Topluluğu',
    period: '2025 – Devam Ediyor',
  },
  {
    role: 'Sosyal Sorumluluk Ekibi Başkanı',
    organization: 'İnönü Teknofest Topluluğu',
    period: '2025 – Devam Ediyor',
  },
  {
    role: 'Yönetim Kurulu Üyesi',
    organization: 'İnönü Genç TEMA',
    period: '2024 – 2025',
  },
  {
    role: 'Eğitim Desteği Bursiyeri',
    organization: 'T3 Vakfı',
    period: '2025',
  },
]

export default function Hakkimda() {
  return (
    <section
      id="about"
      className="mx-auto max-w-container-max px-margin-x pb-stack-lg pt-stack-lg"
    >
      <div className="flex flex-col items-start gap-stack-lg md:flex-row">
        <div className="sticky top-32 w-full md:w-5/12 lg:w-4/12">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-b from-primary/20 to-transparent opacity-25 blur transition duration-1000 group-hover:opacity-40" />
            <img
              src="/resimler/karakter.png"
              alt="Elif Kavurga karakter illüstrasyonu"
              className="image-glow relative aspect-[0.67] w-full rounded-lg border border-outline-variant object-cover"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-stack-md md:w-7/12 lg:w-8/12">
          <div className="mb-stack-sm border-b border-outline-variant pb-stack-sm">
            <h2 className="mb-2 font-display text-display-lg text-primary">
              Merhaba, Ben Bir Geliştiriciyim.
            </h2>
            <p className="font-label text-label-md uppercase tracking-widest text-outline">
              Full-Stack Mühendisi &amp; Yazılım Geliştirici
            </p>
          </div>

          <div className="space-y-stack-md font-body text-body-lg leading-relaxed text-on-surface-variant">
            <section className="max-w-2xl">
              <p>
                İnönü Üniversitesi Yazılım Mühendisliği bölümünde eğitimime devam ederken Java Spring
                Boot, React ve Flutter teknolojileriyle uçtan uca dijital çözümler geliştiriyorum.
                FootBase, DevLog ve Saye gibi projelerimde full-stack mimari, tasarım desenleri ve
                modüler yazılım yapıları üzerine odaklanıyorum.
              </p>
              <p className="mt-stack-sm">
                T3 Vakfı bursiyeri olarak teknoloji ve eğitim alanındaki sorumluluklarımı İnönü
                Teknofest Topluluğu Yönetim Kurulu üyeliği ve Sosyal Sorumluluk Ekibi başkanlığı
                görevleriyle birleştiriyor; topluluk odaklı projelerde liderlik ve organizasyon
                deneyimi kazanıyorum.
              </p>
            </section>

            <div className="grid grid-cols-1 gap-stack-sm lg:grid-cols-2">
              <div className="rounded-lg border border-outline-variant bg-surface-container p-stack-sm">
                <div className="mb-4 flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined">school</span>
                  <h3 className="font-display text-headline-lg-mobile font-bold">Eğitim</h3>
                </div>
                <ul className="space-y-4 font-body text-body-md text-on-surface-variant">
                  <li className="flex flex-col">
                    <span className="font-bold text-on-surface">{education.degree}</span>
                    <span className="font-label text-label-md">{education.university}</span>
                    <span className="mt-1 font-label text-label-md text-primary">{education.period}</span>
                    <span className="mt-1 font-label text-label-md">AGNO: {education.agno}</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-outline-variant bg-surface-container p-stack-sm">
                <div className="mb-4 flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined">groups</span>
                  <h3 className="font-display text-headline-lg-mobile font-bold">
                    Organizasyonel Deneyim
                  </h3>
                </div>
                <ul className="space-y-4 font-body text-body-md text-on-surface-variant">
                  {organizationalExperience.map((item) => (
                    <li key={`${item.organization}-${item.role}`} className="flex flex-col">
                      <span className="font-bold text-on-surface">{item.role}</span>
                      <span className="font-label text-label-md">{item.organization}</span>
                      <span className="mt-1 font-label text-label-md text-primary">{item.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-outline-variant bg-surface-container p-stack-sm">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">psychology</span>
                <h3 className="font-display text-headline-lg-mobile font-bold">Yazılım Felsefesi</h3>
              </div>
              <p className="font-body text-body-md italic leading-relaxed opacity-90">
                Temiz kod prensipleriyle sürdürülebilir mimariler ve yenilikçi eğitim platformları
                inşa etmek.
              </p>
            </div>

            <section className="max-w-2xl">
              <h3 className="mb-stack-sm font-display text-headline-lg text-on-surface">
                Teknik Odak
              </h3>
              <p>
                Spring Boot ve RESTful API ile backend sistemleri; React ile web arayüzleri; Flutter
                ile mobil uygulamalar geliştiriyorum. PostgreSQL, Git ve Docker gibi araçlarla
                projelerimi uçtan uca yönetiyor; hackathon ve bootcamp deneyimlerimle sürekli
                öğrenmeye devam ediyorum.
              </p>
            </section>

            <div className="pt-stack-md">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 rounded bg-primary px-8 py-4 font-bold text-on-primary transition-all hover:brightness-110 active:scale-95"
              >
                Birlikte Çalışalım
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
