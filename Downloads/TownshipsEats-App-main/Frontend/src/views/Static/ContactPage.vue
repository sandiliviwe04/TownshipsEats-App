<!-- Frontend/src/views/Static/ContactPage.vue -->
<template>
  <div class="contact-page">
    <div class="page-card contact-card">
      <h2 class="text-center mb-20">Contact Us</h2>
      <p class="text-center intro-text mb-40">
        We'd love to hear from you! Reach out with any questions, feedback, or support needs.
      </p>

      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Your Name:</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="email">Your Email:</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="subject">Subject:</label>
          <input type="text" id="subject" v-model="form.subject" required>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" v-model="form.message" rows="6" required></textarea>
        </div>
        <PrimaryButton text="Send Message" type="primary" :fullWidth="true" class="mt-20" />
      </form>

      <div class="contact-info text-center mt-40">
        <h3>Other Ways to Connect</h3>
        <p><strong>Email:</strong> support@townshipeats.co.za</p>
        <p><strong>Phone:</strong> +27 10 123 4567</p>
        <p><strong>Office Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM SAST</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const submitForm = () => {
  alert('Thank you for your message! We will get back to you shortly. (Form submission not implemented yet)');
  console.log('Contact form submitted:', form.value);
  // In a real application, you would send this data to a backend API
  form.value = { // Clear form
    name: '',
    email: '',
    subject: '',
    message: '',
  };
};
</script>

<style scoped>
.contact-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.contact-card {
  max-width: 600px;
  width: 100%;
  text-align: left;
}

.intro-text {
  font-size: 1.1em;
  color: var(--color-grey-text);
}

.contact-form {
  margin-top: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: var(--color-text-dark);
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group textarea {
  width: calc(100% - 22px); /* Account for padding and border */
  padding: 10px;
  border: 1px solid var(--color-border-light);
  border-radius: 5px;
  font-size: 1em;
  background-color: var(--color-background-light);
  color: var(--color-text-dark);
}

.form-group textarea {
  resize: vertical; /* Allow vertical resizing */
}

.contact-info {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px dashed var(--color-border-light);
}

.contact-info h3 {
  color: var(--color-primary-orange);
  margin-bottom: 15px;
  font-size: 1.3em;
}

.contact-info p {
  margin-bottom: 8px;
  color: var(--color-grey-text);
}
</style>