<!-- Frontend/src/components/Shared/AppFooter.vue -->
<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} TownshipEats. All rights reserved.</p>
      <nav class="footer-nav">
        <RouterLink to="/about" class="footer-link">About Us</RouterLink>
        <RouterLink to="/contact" class="footer-link">Contact</RouterLink>
        <RouterLink to="/privacy" class="footer-link">Privacy Policy</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const currentYear = ref(new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  background-color: var(--color-text-dark); /* Dark background for footer */
  color: var(--color-text-light);
  padding: 20px 25px;
  margin-top: 30px;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.05);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
}

.app-footer p {
  margin: 0;
  font-size: 0.9em;
}

.footer-nav {
  display: flex;
  gap: 20px;
}

.footer-link {
  color: var(--color-text-light);
  text-decoration: none;
  font-size: 0.9em;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--color-primary-orange);
  text-decoration: underline;
}
</style>