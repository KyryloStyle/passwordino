// utils/passwordUtils.ts
export function calculateScore(password: string): number {
  let score = 0
  if (!password) return 0
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (password.length >= 6) score++
  if (password.length >= 9) score++
  if (password.length >= 12) score++
  return score
}

export function strengthLabel(score: number): string {
  if (score <= 2) return 'Weak'
  if (score <= 4) return 'Medium'
  return 'Strong'
}

export function getRecommendations(password: string): string[] {
  const s: string[] = []
  if (password.length < 12) s.push('Increase the password length (12+ chars recommended).')
  if (!/[A-Z]/.test(password)) s.push('Add at least one uppercase letter.')
  if (!/[a-z]/.test(password)) s.push('Add at least one lowercase letter.')
  if (!/\d/.test(password)) s.push('Include at least one number.')
  if (!/[^A-Za-z0-9]/.test(password)) s.push('Use at least one special character (!, @, #, $, %, …).')
  if (s.length === 0) s.push('Your password looks strong, but do not reuse it.')
  return s
}

// Простая оценка времени взлома (условная, грубая)
export function estimateTimeToCrack(password: string) {
  const len = password.length
  if (len === 0) return { online: '-', cpu: '-', gpu: '-' }
  if (len < 6) return { online: 'Instant', cpu: 'Minutes', gpu: 'Seconds' }
  if (len < 10) return { online: 'Minutes', cpu: 'Hours', gpu: 'Minutes' }
  if (len < 14) return { online: 'Hours', cpu: 'Days', gpu: 'Hours' }
  return { online: 'Years', cpu: 'Decades', gpu: 'Years' }
}

// Простейшие утилиты
export function getPoolSize(password: string): number {
  let pool = 0
  if (/[a-z]/.test(password)) pool += 26
  if (/[A-Z]/.test(password)) pool += 26
  if (/\d/.test(password)) pool += 10
  if (/[^A-Za-z0-9]/.test(password)) pool += 32
  return pool
}

export function charTypesCount(password: string): string {
  const types = []
  if (/[a-z]/.test(password)) types.push('lowercase')
  if (/[A-Z]/.test(password)) types.push('uppercase')
  if (/\d/.test(password)) types.push('numbers')
  if (/[^A-Za-z0-9]/.test(password)) types.push('symbols')
  return types.join(', ')
}

// Генератор случайного пароля
export function generatePassword(length = 12): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?'
  let pwd = ''
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return pwd
}
