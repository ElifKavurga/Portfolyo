import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Programlama Dilleri',
    icon: 'code',
    skills: ['Java', 'C', 'Dart', 'Python'],
  },
  {
    title: 'Framework & Teknolojiler',
    icon: 'layers',
    skills: ['Spring Boot', 'React (temel)', 'RESTful API'],
  },
  {
    title: 'Veritabanı',
    icon: 'database',
    skills: ['PostgreSQL', 'MySQL'],
  },
  {
    title: 'Araçlar & Teknolojiler',
    icon: 'build',
    skills: ['Git', 'GitHub', 'Docker', 'IntelliJ IDEA', 'VS Code', 'Android Studio', 'Figma'],
  },
]

function getOrbitPosition(index, total, radius) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }
}

function SkillCard({ category, index, radius }) {
  const position = getOrbitPosition(index, skillCategories.length, radius)

  return (
    <motion.div
      className="glass-card absolute left-1/2 top-1/2 z-20 w-56 -translate-x-1/2 -translate-y-1/2 rounded-xl p-5 md:w-64"
      initial={{ opacity: 0, scale: 0.9, x: position.x, y: position.y }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={{
        x: position.x,
        y: [position.y, position.y - 14, position.y],
      }}
      transition={{
        y: {
          duration: 5 + index * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        },
        opacity: { duration: 0.6, delay: index * 0.15 },
        scale: { duration: 0.6, delay: index * 0.15 },
      }}
      whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="material-symbols-outlined text-3xl text-primary">{category.icon}</span>
        <h3 className="font-label text-label-md font-bold uppercase tracking-widest text-on-surface">
          {category.title}
        </h3>
      </div>
      <ul className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-on-surface-variant"
          >
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Yetenekler() {
  const orbitRadius = 280

  return (
    <section id="skills" className="relative overflow-hidden py-stack-lg">
      <div className="skills-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[128px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-[128px]" />

      <div className="relative mx-auto max-w-container-max px-margin-x">
        <div className="mb-stack-md text-center">
          <h2 className="mb-2 bg-gradient-to-r from-on-surface to-primary bg-clip-text font-display text-display-lg text-transparent">
            Teknik Yetkinlikler
          </h2>
        </div>

        <div className="relative mx-auto hidden min-h-[760px] max-w-4xl md:block">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-[520px] w-[520px] rounded-full border border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute h-[440px] w-[440px] rounded-full border border-secondary/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 flex aspect-square w-full max-w-md items-center justify-center">
              <img
                src="/resimler/yetenekler.png"
                alt="Yetenekler karakter illüstrasyonu"
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_50px_rgba(173,198,255,0.2)]"
              />
            </div>
          </div>

          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} radius={orbitRadius} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="glass-card rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-primary">{category.icon}</span>
                <h3 className="font-label text-label-md font-bold uppercase tracking-widest text-on-surface">
                  {category.title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-on-surface-variant"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
