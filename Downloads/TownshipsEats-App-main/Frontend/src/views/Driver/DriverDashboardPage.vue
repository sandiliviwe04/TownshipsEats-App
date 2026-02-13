<!-- Frontend/src/views/Driver/DriverDashboardPage.vue -->
<template>
  <div class="driver-dashboard-page">
    <div class="page-card dashboard-card">
      <h2 class="text-center">Driver Dashboard</h2>
      <p class="text-center">Welcome, {{ driverName }}! Ready for your next delivery?</p>

      <div class="dashboard-stats">
        <div class="stat-item">
          <h3>Deliveries Today</h3>
          <p class="stat-value">{{ deliveriesToday }}</p>
        </div>
        <div class="stat-item">
          <h3>Earnings Today</h3>
          <p class="stat-value">R{{ earningsToday.toFixed(2) }}</p>
        </div>
      </div>

      <div class="dashboard-sections mt-40">
        <div class="section-item">
          <h3>Available Orders</h3>
          <p>Check for new delivery requests.</p>
          <PrimaryButton text="View Available" type="primary" @click="goToAvailableOrders" />
        </div>
        <div class="section-item">
          <h3>My Earnings</h3>
          <p>Review your detailed earnings history.</p>
          <PrimaryButton text="View Earnings" type="primary" @click="goToEarnings" />
        </div>
        <div class="section-item">
          <h3>My Profile</h3>
          <p>Update your personal and vehicle details.</p>
          <PrimaryButton text="Edit Profile" type="primary" @click="goToProfile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';

const router = useRouter();

const driverName = ref('Sizwe');
const deliveriesToday = ref(5);
const earningsToday = ref(250.00);

const goToAvailableOrders = () => {
  router.push('/driver/available-orders');
};

const goToEarnings = () => {
  router.push('/driver/earnings');
};

const goToProfile = () => {
  router.push('/driver/profile');
};
</script>

<style scoped>
/* (No changes to existing styles, adding .dashboard-sections style) */
.driver-dashboard-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.dashboard-card {
  max-width: 800px;
  width: 100%;
}

.dashboard-stats {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-top: 30px;
  text-align: center;
}

.stat-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px;
  flex: 1;
}

.stat-item h3 {
  color: var(--color-grey-text);
  margin-bottom: 10px;
  font-size: 1.1em;
}

.stat-value {
  font-size: 2.2em;
  font-weight: bold;
  color: var(--color-primary-orange);
}

/* Added styles for dashboard-sections */
.dashboard-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.section-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.section-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.section-item h3 {
  color: var(--color-primary-orange);
  margin-bottom: 15px;
}

.section-item p {
  color: var(--color-grey-text);
  margin-bottom: 20px;
}
</style>