<!-- Frontend/src/views/Auth/RegistrationPage.vue -->
<template>
  <div class="registration-page">
    <div class="page-card registration-card">
      <div class="text-center mb-20">
        <h2 style="color: var(--color-primary-orange);">Register for TownshipsEats</h2>
        <p>Create your new account</p>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="success" class="success-message">{{ success }}</div>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        </div>
        <PrimaryButton 
          :text="loading ? 'Registering...' : 'Register'" 
          type="primary" 
          :fullWidth="true" 
          class="mt-20" 
          :disabled="loading"
        />
      </form>

      <p class="text-center mt-20">
        Already have an account? <RouterLink to="/login">Login here</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';
import axios from 'axios';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');
const router = useRouter();

const handleRegister = async () => {
  error.value = '';
  success.value = '';

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match!';
    return;
  }

  loading.value = true;

  try {
    const response = await axios.post('http://localhost:5401/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value
    });

    if (response.data.success) {
      success.value = 'Registration successful! Redirecting to login...';
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  } catch (err) {
    console.error('Registration error:', err);
    error.value = err.response?.data?.error || 'Registration failed. Please try again.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.registration-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
}

.registration-card {
  max-width: 450px;
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

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid var(--color-border-light);
  border-radius: 5px;
  font-size: 1em;
}

.mt-20 {
  margin-top: 20px;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  border: 1px solid #ef9a9a;
}

.success-message {
  background-color: #e8f5e8;
  color: #2e7d32;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
  border: 1px solid #a5d6a7;
}
</style>