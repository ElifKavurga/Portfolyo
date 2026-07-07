export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function fetchProjects() {
  const response = await fetch(`${API_BASE_URL}/api/projects`)

  if (!response.ok) {
    throw new Error(`Projeler alınamadı (${response.status})`)
  }

  return response.json()
}
