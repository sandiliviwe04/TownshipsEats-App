<!-- Frontend/src/views/Driver/DriverProfilePage.vue -->
<template>
  <div class="driver-profile-page">
    <div class="page-card profile-card">
      <BackButton class="mb-20">Back to Dashboard</BackButton>
      <h2 class="text-center mb-20">Driver Profile</h2>

      <div class="profile-details">
        <div class="detail-item">
          <span class="label">Name:</span>
          <span class="value">{{ driverProfile.name }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Email:</span>
          <span class="value">{{ driverProfile.email }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Phone:</span>
          <span class="value">{{ driverProfile.phone }}</span>
        </div>
        <div class="detail-item">
          <span class="label">Vehicle:</span>
          <span class="value">{{ driverProfile.vehicle }}</span>
        </div>
        <div class="detail-item">
          <span class="label">License No:</span>
          <span class="value">{{ driverProfile.licenseNo }}</span>
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
import BackButton from '../../components/Shared/BackButton.vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';

const driverProfile = ref({
  name: 'Sizwe Dlamini',
  email: 'sizwe.dlamini@example.com',
  phone: '+27 60 123 4567',
  vehicle: 'Motorbike (Yamaha YBR 125)',
  licenseNo: 'DL123456789',
});

const editProfile = () => {
  alert('Edit driver profile functionality coming soon!');
  // In a real app, you would navigate to an edit form or open a modal
};
</script>

<style scoped>
.driver-profile-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.profile-card {
  max-width: 600px;
  width: 100%;
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
  min-width: 120px; /* Adjusted width for driver details */
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