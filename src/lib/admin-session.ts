export const ADMIN_SESSION_COOKIE = 'el_medina_admin_session'

function envOrFallback(name: string, fallback: string): string {
  const value = process.env[name]?.trim()
  return value && value.length > 0 ? value : fallback
}

export function getAdminCredentials() {
  return {
    username: envOrFallback('ADMIN_USERNAME', 'admin'),
    password: envOrFallback('ADMIN_PASSWORD', 'elmedina2024'),
  }
}

export function getAdminSessionValue(): string {
  return envOrFallback('ADMIN_SESSION_SECRET', 'el-medina-admin-session')
}

export function isValidAdminSession(
  cookieValue: string | undefined | null,
): boolean {
  return cookieValue === getAdminSessionValue()
}
