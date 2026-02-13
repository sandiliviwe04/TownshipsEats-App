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

      <div class="profile-actions text-center mt-40">
        <PrimaryButton text="Edit Profile" type="primary" @click="editProfile" class="mr-10" />
        <PrimaryButton text="Order History" type="secondary" @click="goToOrderHistory" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';

const router = useRouter(); // Initialize router

const userProfile = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+27 71 123 4567',
  address: '123 Main Street, Soweto, Johannesburg',
});

const editProfile = () => {
  alert('Edit profile functionality coming soon!');
  // In a real app, you would navigate to an edit form or open a modal
};

const goToOrderHistory = () => {
  router.push('/customer/order-history');
};
</script>

<style scoped>
/* (No changes to existing styles) */
.profile-page {
  display: flex;
  justify-content: center;
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

.profile-actions {
  display: flex;
  justify-content: center;
  gap: 15px; /* Spacing between buttons */
}

.mr-10 {
  margin-right: 10px;
}
</style>