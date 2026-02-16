<!-- Frontend/src/components/Shared/AppHeader.vue -->
<template>
  <header class="app-header-component">
    <div class="header-content flex-between">
      <RouterLink to="/" class="logo-link">
        <!-- Placeholder for your logo -->
        <!-- <img :src="logo" alt="TownshipsEats Logo" class="app-logo"> -->
        <h2 style="color: var(--color-primary-orange); margin: 0;">TownshipsEats</h2>
      </RouterLink>

      <nav class="main-nav">
        <!-- Conditional Navigation based on userRole -->
        <template v-if="userRole === 'customer'">
          <RouterLink to="/customer/home" class="nav-item">Home</RouterLink>
          <RouterLink to="/customer/categories" class="nav-item">Categories</RouterLink>
          <RouterLink to="/customer/favorites" class="nav-item">Favorites</RouterLink>
          <RouterLink to="/customer/profile" class="nav-item">Profile</RouterLink>
          <RouterLink to="/customer/cart" class="nav-item">Cart</RouterLink>
          <PrimaryButton @click="logout" text="Logout" type="danger" />
        </template>
        <template v-else-if="userRole === 'vendor'">
          <RouterLink to="/vendor/dashboard" class="nav-item">Dashboard</RouterLink>
          <RouterLink to="/vendor/menu-management" class="nav-item">Menu</RouterLink>
          <PrimaryButton @click="logout" text="Logout" type="danger" />
        </template>
        <template v-else-if="userRole === 'driver'">
          <RouterLink to="/driver/dashboard" class="nav-item">Dashboard</RouterLink>
          <PrimaryButton @click="logout" text="Logout" type="danger" />
        </template>
        <template v-else>
          <!-- Not logged in -->
          <RouterLink to="/login" class="nav-item">Login</RouterLink>
          <RouterLink to="/register" class="nav-item">Register</RouterLink>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import PrimaryButton from './PrimaryButton.vue'; // Import our new button component

const props = defineProps({
  userRole: {
    type: String, // 'customer', 'vendor', 'driver', null
    default: null,
  },
});

const emit = defineEmits(['logout']);

const logout = () => {
  emit('logout');
};
</script>

<style scoped>
.app-header-component {
  background-color: var(--color-text-light);
  padding: 15px 25px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 20px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.app-logo {
  height: 40px;
  margin-right: 10px;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 25px;
}

.nav-item {
  font-weight: bold;
  color: var(--color-grey-text);
  text-decoration: none;
  font-size: 1.1em;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: var(--color-primary-orange);
  text-decoration: none;
}

.nav-item.router-link-exact-active {
  color: var(--color-primary-orange);
  border-bottom: 2px solid var(--color-primary-orange);
  padding-bottom: 5px;
}
</style>