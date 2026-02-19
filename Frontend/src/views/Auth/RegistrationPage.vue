<!-- Frontend/src/views/Auth/RegistrationPage.vue -->
<template>
  <div class="registration-page">
    <div class="page-card registration-card">
      <div class="text-center mb-20">
        <h2 style="color: var(--color-primary-orange);">Register for TownshipsEats</h2>
        <p>Create your new account</p>
      </div>

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
        <PrimaryButton text="Register" type="primary" :fullWidth="true" class="mt-20" />
      </form>

      <p class="text-center mt-20">
        Already have an account? <RouterLink to="/login">Login here</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue'; // Import our new button component

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = () => {
  if (password.value!== confirmPassword.value) {
    alert('Passwords do not match!');
    return;
  }
  console.log('Attempting registration with:', username.value, email.value);
  alert('Registration attempted. (Not implemented yet)');
  // Implement your registration logic here
};
</script>

<style scoped>
/* Keep existing styles */

.registration-page{
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #dfd1c6, #ff9e16);
  overflow: hidden;
}

.login-page::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  top: -100px;
  right: -100px;
  filter: blur(100px);
}


.registration-card {
  background-color: rgb(238, 248, 248);
  width: 100%;
  max-width: 480px;   /* was 400px */
  padding: 50px;      /* was 40px */
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
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

</style>