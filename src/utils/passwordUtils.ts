// utils/passwordUtils.ts

const SCORE_THRESHOLDS = {
  MIN_LENGTH: 6,
  GOOD_LENGTH: 9,
  STRONG_LENGTH: 12,
} as const

export function calculateScore(password: string): number {
  let score = 0
  if (!password) return 0
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (password.length >= SCORE_THRESHOLDS.MIN_LENGTH) score++
  if (password.length >= SCORE_THRESHOLDS.GOOD_LENGTH) score++
  if (password.length >= SCORE_THRESHOLDS.STRONG_LENGTH) score++
  return score
}

export function getRecommendations(password: string): string[] {
  const s: string[] = []
  if (password.length < SCORE_THRESHOLDS.STRONG_LENGTH) s.push('Increase the password length (12+ chars recommended).')
  if (!/[A-Z]/.test(password)) s.push('Add at least one uppercase letter.')
  if (!/[a-z]/.test(password)) s.push('Add at least one lowercase letter.')
  if (!/\d/.test(password)) s.push('Include at least one number.')
  if (!/[^A-Za-z0-9]/.test(password)) s.push('Use at least one special character (!, @, #, $, %, …).')
  if (s.length === 0) s.push('Your password looks strong, but do not reuse it.')
  return s
}

// Estimates based on log-scale arithmetic to handle large search spaces.
// Assumes worst-case (no salting, fast algorithm like MD5/SHA1).
// Real crack time depends on the hash algorithm and hardware used.
export function estimateTimeToCrack(password: string, pool = 26) {
  if (!password) return { online: '-', gpu: '-', cpu: '-' }

  const log10SearchSpace = password.length * Math.log10(pool)

  function guessesToTime(log10guessesPerSec: number): string {
    const log10seconds = log10SearchSpace - log10guessesPerSec
    if (log10seconds < 0) return 'Instant'
    if (log10seconds < Math.log10(60)) return 'Seconds'
    if (log10seconds < Math.log10(3_600)) return 'Minutes'
    if (log10seconds < Math.log10(86_400)) return 'Hours'
    if (log10seconds < Math.log10(86_400 * 365)) return 'Days'
    if (log10seconds < Math.log10(86_400 * 365 * 1_000)) return 'Years'
    if (log10seconds < Math.log10(86_400 * 365 * 1e9)) return 'Millennia'
    return 'Practically Forever'
  }

  return {
    online: guessesToTime(1),   // ~10/sec (rate-limited online attack)
    gpu: guessesToTime(10),     // ~10 billion/sec (fast GPU, weak hash)
    cpu: guessesToTime(13),     // ~10 trillion/sec (massive compute farm)
  }
}

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

const GENERATOR_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?'

// Uses crypto.getRandomValues() for cryptographically secure random generation.
export function generatePassword(length = 12): string {
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  let pwd = ''
  for (let i = 0; i < length; i++) {
    pwd += GENERATOR_CHARS.charAt((array[i] as number) % GENERATOR_CHARS.length)
  }
  return pwd
}
