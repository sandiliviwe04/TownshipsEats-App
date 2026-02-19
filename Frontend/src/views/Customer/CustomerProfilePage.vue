<!-- Frontend/src/views/Customer/CustomerProfilePage.vue -->
<template>
  <div class="profile-page">
    <div class="page-card profile-card">
      <h2 class="text-center mb-20">Your Profile</h2>

      <div class="profile-details">
        <div class="detail-item">
          <span class="label">Name:</span>
          <span class="value">{{ userProfile.name }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Email:</span>
          <span class="value">{{ userProfile.email }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Phone:</span>
          <span class="value">{{ userProfile.phone }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Address:</span>
          <span class="value">{{ userProfile.address }}</span>
        </div>
      </div>

      <div class="text-center mt-20">
        <PrimaryButton text="Edit Profile" type="primary" @click="editProfile" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue'; // Import PrimaryButton

const userProfile = ref({
  name: 'Khangelani Mhlakane',
  email: 'khangelani.mhlakane@example.com',
  phone: '+27 71 123 4567',
  address: '254 Fernandez Street, Samora, Cape Town, South Africa',
});

const editProfile = () => {
  alert('Edit profile functionality coming soon!');
  // In a real app, you would navigate to an edit form or open a modal
};
</script>

<style scoped>
/* Keep existing styles */
.profile-page {
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
  padding: 20px;
}

.profile-card {
  max-width: 600px;
}

.profile-details {
  margin-top: 20px;
  border-top: 1px solid var(--color-border-light);
  padding-top: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed var(--color-border-light);
}

.detail-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  color: var(--color-grey-text);
  min-width: 100px;
  text-align: left;
}

.value {
  color: var(--color-text-dark);
  text-align: right;
  flex-grow: 1;
}

.mt-20 {
  margin-top: 20px;
}
</style>