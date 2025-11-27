<template>
  <section class="profile-wrapper">
    <div class="profile-container">
      
      <div class="profile-card">
        <!-- Photo Section -->
        <div class="photo-column">
          <div class="photo-frame">
           
            <img 
              src="../../public/logo-min.jpg" 
              alt="Kyrylo Yurchenko" 
              class="profile-img"
            />
            <div class="status-badge" title="Located in Germany">
              <!-- SVG Flag: Germany -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" class="flag-icon">
                <rect width="5" height="3" fill="#FFCE00"/>
                <rect width="5" height="2" fill="#DD0000"/>
                <rect width="5" height="1" fill="#000000"/>
              </svg>
              Germany
            </div>
          </div>
        </div>

        <!-- Info Section -->
        <div class="info-column">
          <div class="header-group">
            <h2>Kyrylo Yurchenko</h2>
            <div class="role-tag">Software Engineer Graduate</div>
          </div>

          <p class="bio">
            Originally from 
            <span class="highlight-text">
              Ukraine 
              <!-- SVG Flag: Ukraine -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 2" class="flag-icon inline-flag">
                <rect width="2" height="2" fill="#FFD700"/>
                <rect width="2" height="1" fill="#0057B8"/>
              </svg>
            </span>, now based in Germany. 
            I am deeply passionate about <strong>SaaS development</strong> and building scalable web applications. 
            Focused on creating clean code and secure user experiences.
          </p>

          <!-- Social Links -->
          <div class="social-links">
            
            <!-- GitHub -->
            <a href="https://github.com/KyryloStyle" target="_blank" class="social-btn github">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span>GitHub</span>
            </a>

            <!-- LinkedIn -->
            <a href="https://www.linkedin.com/in/kyrylo-yurchenko/" target="_blank" class="social-btn linkedin">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span>LinkedIn</span>
            </a>

            <!-- Email  -->
            <a href="mailto:kyrylo.yurchenkoo@gmail.com" class="social-btn email">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>Contact Me</span>
            </a>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* Inherit Variables */
:root {
  --bg: #030712;
  --surface: #111827;
  --border: #374151;
  --primary: #38bdf8;
  --text-main: #f9fafb;
  --text-muted: #9ca3af;
}

.profile-wrapper {
  width: 100%;
  background-color: var(--bg);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  padding: 80px 24px;
  border-top: 1px solid var(--border);
}

.profile-container {
  max-width: 900px;
  margin: 0 auto;
}

.profile-card {
  display: flex;
  gap: 48px;
  background: linear-gradient(145deg, rgba(17, 24, 39, 0.6) 0%, rgba(17, 24, 39, 0.3) 100%);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 40px;
  align-items: center;
  backdrop-filter: blur(10px);
}

/* Photo Column */
.photo-column {
  flex-shrink: 0;
}

.photo-frame {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, var(--primary), transparent);
}

.profile-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--bg); 
  background-color: var(--surface);
}

.status-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  cursor: default;
}

.flag-icon {
  width: 20px;
  height: 14px;
  border-radius: 2px;
  box-shadow: 0 0 1px rgba(255,255,255,0.2);
  display: block;
}

.inline-flag {
  display: inline-block;
  vertical-align: middle;
  margin-left: 2px;
  position: relative;
  top: -1px;
}

/* Info Column */
.info-column {
  flex: 1;
}

.header-group {
  margin-bottom: 16px;
}

h2 {
  font-size: 32px;
  margin: 0 0 8px 0;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(to right, #fff, #9ca3af);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.role-tag {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--primary);
  background: rgba(56, 189, 248, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.bio {
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 15px;
  margin-bottom: 32px;
  max-width: 500px;
}

.highlight-text {
  color: #fff;
  font-weight: 500;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.03);
  color: var(--text-main);
}

.social-btn:hover {
  transform: translateY(-2px);
  background: rgba(255,255,255,0.08);
  border-color: var(--text-muted);
}

.social-btn.github:hover { border-color: #fff; }
.social-btn.linkedin:hover { border-color: #0a66c2; color: #0a66c2; }
.social-btn.email:hover { border-color: var(--primary); color: var(--primary); }

/* Responsive */
@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
    padding: 32px 24px;
    gap: 32px;
  }
  
  .social-links {
    justify-content: center;
  }

  .bio {
    margin: 0 auto 32px auto;
  }
  
  .status-badge {
    right: 50%;
    transform: translateX(50%);
    bottom: -12px;
  }
}
</style>