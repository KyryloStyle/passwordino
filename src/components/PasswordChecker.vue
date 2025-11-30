<template>
  <div class="app-layout">
    <div class="ambient-glow"></div>

    <nav class="navbar">
      <div class="brand" @click="reloadPage" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        <span>Passwodino</span>
      </div>
      <div class="nav-links">
          <button @click="scrollTo('explanation')">Explanation</button>
          <button @click="scrollTo('creator')">Creator</button>
      </div>
    </nav>

    <main class="main-content">
      
      <section class="hero-section">
        <div class="input-container" :class="{ 'focused': isFocused }">
          <input
            v-model="password"
            :type="show ? 'text' : 'password'"
            placeholder="Type or generate..."
            class="mega-input"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @input="onInput"
            autocomplete="off"
            spellcheck="false"
          />
          
          <div class="controls">
            <button class="control-btn" @click="toggleShow" :title="show ? 'Hide Password' : 'Show Password'">
              <svg v-if="show" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
            
            <button class="control-btn" @click="generate" title="Generate New">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            </button>

            <button class="control-btn primary-action" @click="copyToClipboard" :class="{ 'success-state': copied }">
              <span v-if="!copied">Copy</span>
              <span v-else>Copied!</span>
            </button>
          </div>
        </div>

        <div class="strength-line-container">
          <div class="strength-line" :class="strengthClass" :style="{ width: fillWidth }"></div>
        </div>
        <div class="strength-label" :class="strengthClass">
          {{ label }}
        </div>
      </section>

      <section class="dashboard-grid">
        
        <div class="card metrics-card">
          <h3>Core Metrics</h3>
          <div class="metrics-row">
            <div class="metric">
              <div class="metric-val">{{ password.length }}</div>
              <div class="metric-label">Length</div>
            </div>
            <div class="metric">
              <div class="metric-val">{{ poolSize }}</div>
              <div class="metric-label">Char Pool</div>
            </div>
            <div class="metric">
              <div class="metric-val">{{ combosDisplay }}</div>
              <div class="metric-label">Entropy</div>
            </div>
          </div>
        </div>

        <div class="card composition-card">
          <h3>Composition</h3>
          <div class="chips-container">
            <div class="chip" :class="{ active: hasLower }">abc</div>
            <div class="chip" :class="{ active: hasUpper }">ABC</div>
            <div class="chip" :class="{ active: hasNumber }">123</div>
            <div class="chip" :class="{ active: hasSymbol }">#$&</div>
          </div>
        </div>

        <div class="card crack-card">
          <h3>Estimated Crack Time</h3>
          <div class="crack-grid">
            <div class="crack-row">
              <span class="crack-type">Online Attack</span>
              <span class="crack-time">{{ time.online }}</span>
            </div>
            <div class="crack-row">
              <span class="crack-type">Offline (Fast GPU)</span>
              <span class="crack-time">{{ time.gpu }}</span>
            </div>
            <div class="crack-row">
              <span class="crack-type">Massive Farm</span>
              <span class="crack-time highlight">{{ time.cpu }}</span> 
              </div>
          </div>
        </div>

        <div class="card recs-card">
          <h3>Security Audit</h3>
          <ul v-if="recommendations.length" class="rec-list">
            <li v-for="(rec, i) in recommendations" :key="i">
              <span class="bullet">!</span> {{ rec }}
            </li>
          </ul>
          <div v-else class="perfect-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <div>No weaknesses found. Perfect!</div>
          </div>
        </div>

      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  calculateScore,
  getRecommendations,
  estimateTimeToCrack,
  getPoolSize,
  generatePassword
} from '../utils/passwordUtils'


const password = ref('')
const show = ref(true)
const copied = ref(false)
const isFocused = ref(false)


const hasLower = computed(() => /[a-z]/.test(password.value))
const hasUpper = computed(() => /[A-Z]/.test(password.value))
const hasNumber = computed(() => /\d/.test(password.value))
const hasSymbol = computed(() => /[^A-Za-z0-9]/.test(password.value))

const score = computed(() => calculateScore(password.value))

const label = computed(() => {
  
  switch (score.value) {
    case 0: return ' '
    case 1: return 'Very Weak'
    case 2: return 'Weak'
    case 3: return 'Medium'
    case 4: return 'Strong'
    case 5: return 'Very Strong'
    default: return 'Enter Password'
  }
})



const recommendations = computed(() => getRecommendations(password.value)) // Ensure these are English in utils
const time = computed(() => estimateTimeToCrack(password.value))
const poolSize = computed(() => getPoolSize(password.value))

const combosDisplay = computed(() => {
  if (!password.value) return '0'
  const val = Math.pow(poolSize.value, password.value.length)
  return val > 1e9 ? val.toExponential(1) : Math.floor(val).toLocaleString()
})

const fillWidth = computed(() => {
  if (!password.value) return '0%'
  const maxScore = 5 
  return Math.min(100, (score.value / maxScore) * 100) + '%'
})

const strengthClass = computed(() => {
  switch (score.value) {
    case 0:
    case 1: return 'danger'
    case 2:
    case 3: return 'warning'
    case 4: 
    case 5: return 'success'
    default: return 'neutral'
  }
})

// Actions
function toggleShow() { show.value = !show.value }

function generate() {
  password.value = generatePassword(18) // High default security
  show.value = true
  copied.value = false
}

function onInput() {
  copied.value = false
}

function reloadPage() {
  window.location.reload();
}

function scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

async function copyToClipboard() {
  if (!password.value) return
  try {
    await navigator.clipboard.writeText(password.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  } catch (err) {
    console.error('Failed to copy', err)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

/* --- Reset & Base --- */
:root {
  --bg: #030712;
  --surface: #111827;
  --surface-hover: #1f2937;
  --border: #374151;
  
  --primary: #38bdf8;
  --primary-glow: rgba(56, 189, 248, 0.2);
  
  --danger: #ef4444;
  --warning: #f59e0b;
  --success: #10b981;
  --neutral: #6b7280;
  
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
}

.app-layout {
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  
}

/* --- Ambient Effects --- */
.ambient-glow {
  position: absolute;
  top: 0;
  left: 20%;
  width: 60%;
  height: 80%;
  background: radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(3,7,18,0) 70%);
  pointer-events: none;
  z-index: 0;
}

/* --- Navbar --- */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  z-index: 10;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.5px;
  cursor: pointer;
}
.logo-icon { color: var(--primary); }

.nav-links {
  display: flex;
  gap: 32px;
}
.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover, .nav-links a.active { color: var(--text-main); }

/* --- Main Content --- */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 48px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  z-index: 1;
}

/* --- Hero Section --- */
.hero-section {
  width: 100%;
  margin-bottom: 64px;
  text-align: center;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--border);
  padding-bottom: 16px;
  transition: border-color 0.3s ease;
}

.input-container.focused { border-color: var(--primary); }

.mega-input {
  background: transparent;
  border: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 3rem; /* Huge text */
  color: #fff;
  width: 100%;
  outline: none;
  font-weight: 500;
}

.mega-input::placeholder { color: #374151; }

.controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.control-btn {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.control-btn:hover {
  background: var(--surface-hover);
  color: #fff;
  border-color: var(--neutral);
}

.primary-action {
  background: var(--text-main);
  color: #000;
  font-weight: 600;
  padding: 12px 24px;
  font-size: 14px;
  border: none;
  min-width: 100px;
}
.primary-action:hover { background: #e5e7eb; color: #000; }

.success-state {
  background: var(--success) !important;
  color: #fff !important;
}

.strength-line-container {
  margin-top: -2px; /* Overlap border */
  height: 2px;
  width: 100%;
  background: transparent;
  display: flex;
}
.strength-line {
  height: 2px;
  transition: all 0.5s ease;
  box-shadow: 0 0 15px currentColor;
}
.strength-line.danger { background: var(--danger); color: var(--danger); }
.strength-line.warning { background: var(--warning); color: var(--warning); }
.strength-line.success { background: var(--success); color: var(--success); }
.strength-line.neutral { background: transparent; }

.strength-label {
  margin-top: 16px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: left;
}
.strength-label.danger { color: var(--danger); }
.strength-label.warning { color: var(--warning); }
.strength-label.success { color: var(--success); }
.strength-label.neutral { opacity: 0; }

/* --- Dashboard Grid --- */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
}

.card {
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.card h3 {
  margin: 0 0 20px 0;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}

/* Card Specifics */
.metrics-card { grid-column: span 1; }
.metrics-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.metric-val {
  font-family: 'JetBrains Mono', monospace;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
}
.metric-label { font-size: 12px; color: var(--neutral); }

.composition-card { grid-column: span 1; }
.chips-container { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  font-size: 12px;
  font-family: 'JetBrains Mono', monospace;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  color: var(--neutral);
  opacity: 0.5;
  transition: all 0.3s;
}
.chip.active {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(56, 189, 248, 0.1);
  opacity: 1;
}

.crack-card { grid-column: span 1; }
.crack-grid { display: flex; flex-direction: column; gap: 12px; }
.crack-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 8px;
}
.crack-row:last-child { border-bottom: none; }
.crack-type { color: var(--text-muted); }
.crack-time { font-family: 'JetBrains Mono', monospace; color: #fff; }
.crack-time.highlight { color: var(--primary); font-weight: 600; }

.recs-card { grid-column: span 1; }
.rec-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  color: #d1d5db;
  line-height: 1.6;
}
.rec-list li {
  margin-bottom: 10px;
  display: flex;
  gap: 8px;
}
.bullet { color: var(--warning); font-weight: bold; }

.perfect-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--success);
  font-size: 13px;
  gap: 12px;
  text-align: center;
}

/* --- Responsive --- */
@media (max-width: 480px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 16px;
    gap: 8px;
  }

  .nav-links {
    width: 100%;
    justify-content: space-between;
  }

  .mega-input {
    font-size: 1.2rem;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .card {
    padding: 16px;
  }
}

</style>