<script setup lang="ts">
import CreatorProfile from './components/CreatorProfile.vue'
import PasswordChecker from './components/PasswordChecker.vue'
import SecurityGuide from './components/SecurityGuide.vue'
</script>

<template>
  <div class="app-root">

    <PasswordChecker />

    <section id="explanation">
      <SecurityGuide />
    </section>

    <section id="creator">
      <CreatorProfile />
    </section>

  </div>
</template>

<style>
/* Global base styles are in style.css */
</style>