import { publicAsset } from '../utils/assetPath'

function categoryLabel(category) {
  if (typeof category === 'string') {
    return category
  }

  return category?.label ?? 'Web'
}

export default function ProjectCard({ project }) {
  return (
    <article className="rounded-lg border border-outline-variant bg-surface-container overflow-hidden transition-transform hover:-translate-y-1">
      <div className="aspect-video bg-surface-container-high">
        {project.imageUrl ? (
          <img
            src={publicAsset(project.imageUrl)}
            alt={project.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-on-surface-variant text-sm">
            Görsel bulunamadı
          </div>
        )}
      </div>

      <div className="p-gutter flex flex-col gap-stack-sm">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-on-surface">{project.title}</h3>
          <span className="rounded bg-surface-container-high px-2 py-1 text-xs font-medium text-primary">
            {categoryLabel(project.category)}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-on-surface-variant line-clamp-3">
          {project.description || 'Açıklama mevcut değil.'}
        </p>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          GitHub&apos;da Gör
          <span aria-hidden>→</span>
        </a>
      </div>
    </article>
  )
}
