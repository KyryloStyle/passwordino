<template>
  <section class="guide-wrapper">
    <div class="content-container">
      
      <!-- Section Header -->
      <div class="section-header">
        <h2>How Security Works</h2>
        <p class="subtitle">Understanding the metrics in simple terms</p>
      </div>

      <!-- Grid of Explanations -->
      <div class="cards-grid">
        
        <!-- Card 1: Length -->
        <article class="info-card">
          <div class="icon-box primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 5H19V11"></path><path d="M19 5L5 19"></path></svg>
          </div>
          <h3>Length</h3>
          <p class="description">
            This is the number of characters in your password. It is the single most important multiplier of complexity.
          </p>
          <div class="analogy">
            <strong>Analogy:</strong><br>
            Imagine a combination lock. Length is the number of wheels on it. The more wheels, the exponentially longer it takes to check every combination.
          </div>
        </article>

        <!-- Card 2: Char Pool -->
        <article class="info-card">
          <div class="icon-box warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="2" height="2"></rect><rect x="9" y="13" width="2" height="2"></rect><rect x="13" y="9" width="2" height="2"></rect><rect x="13" y="13" width="2" height="2"></rect><line x1="9" y1="4" x2="9" y2="20"></line><line x1="15" y1="4" x2="15" y2="20"></line><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line></svg>
          </div>
          <h3>Character Pool</h3>
          <p class="description">
            The number of possible options for each individual character slot (letters, numbers, symbols).
          </p>
          <ul class="pool-list">
            <li><span>a-z</span> = 26</li>
            <li><span>A-Z</span> = 26</li>
            <li><span>0-9</span> = 10</li>
            <li><span>#$&</span> ≈ 32</li>
            <li class="total">Total: <strong>94</strong></li>
          </ul>
        </article>

        <!-- Card 3: Entropy -->
        <article class="info-card">
          <div class="icon-box success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
          <h3>Entropy</h3>
          <p class="description">
            The total mathematical search space. This number represents how many guesses a hacker must make to guarantee finding the password.
          </p>
          <div class="formula-box">
            $$ E = Pool^{Length} $$
          </div>
        </article>

      </div>

      <!-- Scientific Notation Explanation -->
      <div class="notation-banner">
        <div class="notation-content">
          <h3>What is 3.7e+31?</h3>
          <p>
            The number of combinations in a strong password is so massive it doesn't fit on the screen.
            We use <em>scientific notation</em>.
          </p>
          <div class="math-explainer">
            <div class="math-part">
              <span class="big">e+31</span>
              <span class="desc">means adding 31 zeros</span>
            </div>
            <div class="arrow">→</div>
            <div class="math-result">
              37,000,000,000,000,000,000,000,000,000,000
            </div>
          </div>
          <p class="note">
            To brute-force this many variations, even a supercomputer would need trillions of years.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// Logic isn't needed here, pure presentation
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');

/* Inherit Variables (Make sure these match your main App) */
:root {
  --bg: #030712;
  --surface: #111827;
  --surface-hover: #1f2937;
  --border: #374151;
  --primary: #38bdf8;
  --success: #10b981;
  --warning: #f59e0b;
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
}

.guide-wrapper {
  width: 100%;
  background-color: var(--bg);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  padding: 80px 24px;
  border-top: 1px solid var(--border);
  position: relative;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;   
  box-sizing: border-box;
}

/* Header */
.section-header {
  text-align: center;
  margin-bottom: 56px;
}

h2 {
  font-size: 32px;
  margin: 0 0 12px 0;
  background: linear-gradient(to right, #fff, #9ca3af);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--text-muted);
  font-size: 16px;
}

/* Grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 64px;
}

/* Card Styles */
.info-card {
  background: rgba(17, 24, 39, 0.5);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.2s, border-color 0.2s;
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  background: rgba(17, 24, 39, 0.8);
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  background: rgba(255,255,255,0.05);
}

.icon-box.primary { color: var(--primary); background: rgba(56, 189, 248, 0.1); }
.icon-box.warning { color: var(--warning); background: rgba(245, 158, 11, 0.1); }
.icon-box.success { color: var(--success); background: rgba(16, 185, 129, 0.1); }

h3 {
  font-size: 18px;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.description {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
}

/* Specific Card Content */
.analogy {
  background: rgba(255,255,255,0.03);
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #d1d5db;
  border-left: 2px solid var(--primary);
}

.pool-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--text-muted);
}
.pool-list li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  border-bottom: 1px dashed rgba(255,255,255,0.1);
  padding-bottom: 2px;
}
.pool-list span { color: #fff; }
.pool-list .total {
  border-bottom: none;
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
  color: #fff;
  font-size: 14px;
}

.formula-box {
  background: #000;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  color: var(--success);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

/* Notation Banner */
.notation-banner {
  background: linear-gradient(90deg, rgba(56,189,248,0.05) 0%, rgba(3,7,18,0) 100%);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.notation-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.math-explainer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 32px 0;
  flex-wrap: wrap;
}

.math-part {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.math-part .big {
  font-family: 'JetBrains Mono', monospace;
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
}

.math-part .desc {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.arrow {
  font-size: 24px;
  color: var(--text-muted);
}

.math-result {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  color: #fff;
  word-break: break-all;
  max-width: 100%;
}

.note {
  font-size: 14px;
  color: var(--text-muted);
  max-width: 600px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  h2 {
    font-size: 24px;
  }

  .subtitle {
    font-size: 14px;
  }

  .info-card {
    padding: 20px;
  }

  .analogy, .formula-box {
    font-size: 12px;
  }
}

</style>