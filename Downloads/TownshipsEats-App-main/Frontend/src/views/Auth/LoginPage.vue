<!-- Frontend/src/views/Auth/LoginPage.vue -->
<template>
  <div class="login-page">
    <div class="page-card login-card">
      <div class="logo-container text-center mb-20">
        <h2 style="color: var(--color-primary-orange);">TownshipsEats</h2>
        <p>Login to your account</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="role">Login As:</label>
          <select id="role" v-model="selectedRole" required>
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        <PrimaryButton text="Login" type="primary" :fullWidth="true" class="mt-20" />
      </form>

      <p class="text-center mt-20">
        Don't have an account? <RouterLink to="/register">Register here</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue'; // Import our new button component

const email = ref('');
const password = ref('');
const selectedRole = ref('customer'); // Default to customer login
const router = useRouter();

const handleLogin = () => {
  // --- TEMPORARY CLIENT-SIDE LOGIN LOGIC ---
  if (
    (selectedRole.value === 'customer' && email.value === 'customer@example.com' && password.value === 'password123') ||
    (selectedRole.value === 'vendor' && email.value === 'vendor@example.com' && password.value === 'password123') ||
    (selectedRole.value === 'driver' && email.value === 'driver@example.com' && password.value === 'password123')
  ) {
    alert(`Login successful as ${selectedRole.value}! Redirecting...`);
    window.loginAs(selectedRole.value); // Use the global function to set role and redirect
  } else {
    alert('Invalid credentials or role. Try: customer/vendor/driver@example.com / password123');
  }
  // --- END TEMPORARY LOGIC ---
};
</script>

<style scoped>
/* Keep existing styles, removed the generic button style if it was there */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}

.login-card {
  max-width: 400px;
}

.logo-container {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="email"],
.form-group input[type="password"],
.form-group select {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid var(--color-border-light);
  border-radius: 5px;
  font-size: 1em;
  background-color: white;
}

.mt-20 {
  margin-top: 20px;
}
</style>