import { scrollToContact } from '../utils/scrollToContact'
import { publicAsset } from '../utils/assetPath'

const education = {
  degree: 'Yazılım Mühendisliği Lisans Programı',
  university: 'İnönü Üniversitesi',
  level: '4. Sınıf Öğrencisi',
  period: '2023 — Devam Ediyor',
}

const organizationalExperience = [
  {
    role: 'Sen Geleceksin Bursiyeri',
    organization: 'T3 Vakfı',
    period: '2026 — Devam Ediyor',
  },
  {
    role: 'Eğitim Desteği Bursiyeri',
    organization: 'T3 Vakfı',
    period: '2025',
  },
  {
    role: 'Sosyal Sorumluluk Ekibi Başkanı',
    organization: 'İnönü Teknofest Topluluğu',
    period: '2025 — Devam Ediyor',
  },
  {
    role: 'Yönetim Kurulu Üyesi',
    organization: 'İnönü Teknofest Topluluğu',
    period: '2025 — Devam Ediyor',
  },
  {
    role: 'Yönetim Kurulu Üyesi',
    organization: 'İnönü Genç TEMA',
    period: '2024 — 2025',
  },
]

function Card({ icon, title, children, className = '' }) {
  return (
    <div className={`rounded-lg border border-outline-variant bg-surface-container p-4 ${className}`}>
      <div className="mb-2 flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-xl">{icon}</span>
        <h3 className="font-display text-lg font-bold">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function Hakkimda() {
  return (
    <section id="about" className="relative mx-auto max-w-container-max px-margin-x py-stack-md">
      <div className="grid items-center gap-stack-md lg:grid-cols-[minmax(280px,390px)_minmax(0,1fr)]">
        <aside className="flex h-full items-center">
          <div className="relative mx-auto w-full max-w-[390px]">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-b from-primary/20 to-transparent opacity-25 blur" />
            <img
              src={publicAsset('resimler/karakter.png')}
              alt="Elif Kavurga karakter illüstrasyonu"
              className="image-glow relative max-h-[560px] w-full rounded-lg border border-outline-variant object-cover object-top"
            />
          </div>
        </aside>

        <div className="flex flex-col gap-3">
          <div className="border-b border-outline-variant pb-3">
            <p className="mb-1 font-label text-label-md uppercase tracking-widest text-outline">
              Hakkımda
            </p>
            <h2 className="max-w-3xl font-display text-display-lg text-on-surface">
              Gelişim yolculuğum
            </h2>
          </div>

          <div className="space-y-2.5 font-body text-body-md leading-relaxed text-on-surface-variant md:text-[16px]">
            <p>
              İnönü Üniversitesi Yazılım Mühendisliği 4. sınıf öğrencisiyim. Derslerde edindiğim
              teorik bilgileri gerçek projelere dönüştürmeyi seviyor, her projede yeni şeyler
              öğrenmeye çalışıyorum.
            </p>
            <p>
              Teknik çalışmaların yanında ekip çalışmaları ve sosyal sorumluluk projelerinde de aktif
              rol aldım. T3 Vakfı burs programlarında yer alıyor, İnönü Teknofest Topluluğunda
              etkinliklerin planlanmasına katkı sağlıyorum.
            </p>
            <p className="font-label text-label-md italic text-primary">
              Hedefim; teknik açıdan gelişirken birlikte çalışması keyifli bir yazılım geliştirici
              olmak.
            </p>
          </div>

          <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div className="flex flex-col gap-3">
              <Card icon="school" title="Eğitim">
                <div className="flex flex-col gap-1 font-body text-body-md text-on-surface-variant">
                  <span className="font-bold text-on-surface">{education.degree}</span>
                  <span className="font-label text-label-md">{education.university}</span>
                  <span className="font-label text-label-md">{education.level}</span>
                  <span className="font-label text-label-md text-primary">{education.period}</span>
                </div>
              </Card>

              <Card icon="terminal" title="Teknik Yaklaşım">
                <p className="font-body text-body-md leading-relaxed text-on-surface-variant">
                  Backend tarafında sağlam temeller kurarken, frontend tarafında kullanıcı deneyimini
                  ön planda tutuyorum. Her projede öğrenmeye devam ediyorum.
                </p>
              </Card>

              <Card icon="psychology" title="Yazılım Felsefesi">
                <p className="font-body text-body-md leading-relaxed text-on-surface">
                  &quot;Önce problemi anlamaya, sonra kod yazmaya inanıyorum.&quot;
                </p>
              </Card>
            </div>

            <Card icon="groups" title="Organizasyonel Deneyim">
              <ul className="space-y-2.5 font-body text-body-md text-on-surface-variant">
                {organizationalExperience.map((item) => (
                  <li key={`${item.organization}-${item.role}-${item.period}`} className="flex flex-col">
                    <span className="font-bold text-on-surface">{item.role}</span>
                    <span className="font-label text-label-md">{item.organization}</span>
                    <span className="font-label text-label-md text-primary">{item.period}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div>
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 rounded bg-primary px-7 py-3.5 font-bold text-on-primary transition-all hover:brightness-110 active:scale-95"
            >
              Birlikte Çalışalım
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
