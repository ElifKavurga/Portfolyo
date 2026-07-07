export const mobileProjectDetails = {
  saye: {
    title: 'SAYE',
    subtitle: 'Konum Tabanlı Çapraz Platform Güvenlik Uygulaması',
    description:
      'Flutter (Mobil), Java Spring Boot (Backend) ve PostGIS (Mekansal Veritabanı) kullanarak geliştirdiğimiz; kullanıcıların anlık konumlarını harita üzerinden paylaşarak güvenliklerini sağlayan çapraz platform uygulamasıdır. Ekip Kaptanı olarak sistemin backend mimarisini, Session tabanlı filtreleme mekanizmalarını ve harita entegrasyonlarını yapılandırarak projenin İnüfest 2026\'da başarıyla sergilenmesini sağladım.',
    tags: ['Flutter', 'Spring Boot', 'PostGIS'],
    icon: 'location_on',
  },
  'mutfak-asistanim': {
    title: 'Mutfak Asistanım',
    subtitle: 'Akıllı Mutfak ve Tarif Yönetim Uygulaması',
    description:
      'Flutter ile geliştirilen mobil mutfak asistanı; kullanıcıların tarifleri yönetmesini, malzeme takibini ve kişiselleştirilmiş yemek önerilerini tek bir arayüzde sunar. Kullanıcı odaklı arayüz ve modüler mobil mimari ile sürdürülebilir bir deneyim hedeflenmiştir.',
    tags: ['Flutter', 'Mobil UI', 'RESTful API'],
    icon: 'restaurant',
  },
  bildunya: {
    title: 'BilDunya',
    subtitle: 'Ortak Mobil Eğitim Platformu',
    description:
      'MehmetAkifGuness ile ortak geliştirilen mobil eğitim uygulaması. Öğrenme içeriklerinin mobil cihazlarda erişilebilir, etkileşimli ve ölçeklenebilir biçimde sunulmasını amaçlayan çapraz platform bir çözümdür.',
    tags: ['Flutter', 'Mobil', 'Ortak Proje'],
    icon: 'school',
  },
}

export const orbPositions = [
  { className: 'absolute -top-12 -ml-[200px]', size: 'h-24 w-24', delay: 0 },
  { className: 'absolute top-24 ml-[280px] md:ml-[350px]', size: 'h-20 w-20', delay: 0.5 },
  { className: 'absolute bottom-12 -ml-[280px] md:-ml-[350px]', size: 'h-20 w-20', delay: 1 },
]

export function getProjectKey(project) {
  const source = `${project.githubUrl} ${project.title}`.toLowerCase()

  if (source.includes('saye')) return 'saye'
  if (source.includes('mutfak')) return 'mutfak-asistanim'
  if (source.includes('bildunya')) return 'bildunya'

  return source.replace(/\s+/g, '-')
}

export function isMobileProject(project) {
  return project.category === 'Mobil' || project.category === 'MOBILE'
}

export function mergeProjectData(apiProject) {
  const key = getProjectKey(apiProject)
  const pdf = mobileProjectDetails[key] ?? {}

  return {
    key,
    title: pdf.title ?? apiProject.title,
    subtitle: pdf.subtitle ?? 'Mobil Proje',
    description: pdf.description || apiProject.description || 'Proje açıklaması mevcut değil.',
    tags: pdf.tags ?? ['Mobil'],
    icon: pdf.icon ?? 'smartphone',
    githubUrl: apiProject.githubUrl,
    imageUrl: apiProject.imageUrl,
  }
}
