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

      <h3 class="mt-40 mb-20 text-center">Available Deliveries</h3>
      <div v-if="availableDeliveries.length > 0" class="delivery-list">
        <div v-for="delivery in availableDeliveries" :key="delivery.id" class="delivery-item">
          <div class="delivery-details">
            <h4>Order #{{ delivery.id }}</h4>
            <p><strong>Pickup:</strong> {{ delivery.pickupLocation }}</p>
            <p><strong>Dropoff:</strong> {{ delivery.dropoffLocation }}</p>
            <p><strong>Est. Earnings:</strong> R{{ delivery.earning.toFixed(2) }}</p>
          </div>
          <PrimaryButton text="Accept" type="success" @click="acceptDelivery(delivery.id)" />
        </div>
      </div>
      <div v-else class="text-center">
        <p>No available deliveries right now. Check back soon!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue'; // Import PrimaryButton

const driverName = ref('Sizwe');
const deliveriesToday = ref(5);
const earningsToday = ref(250.00);

const availableDeliveries = ref([
  { id: 'ORD123', pickupLocation: 'Kasi Flavours', dropoffLocation: 'Street A, House 123', earning: 35.00 },
  { id: 'ORD124', pickupLocation: 'Gourmet Grills', dropoffLocation: 'Street B, Flat 4', earning: 40.00 },
]);

const acceptDelivery = (deliveryId) => {
  alert(`Delivery ${deliveryId} accepted!`);
  // In a real app, this would update the backend and remove from available list
  availableDeliveries.value = availableDeliveries.value.filter(d => d.id!== deliveryId);
};
</script>

<style scoped>
/* Keep existing styles */
.driver-dashboard-page {
  display: flex;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
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

.delivery-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.delivery-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delivery-details {
  text-align: left;
}

.delivery-details h4 {
  margin: 0 0 5px;
  color: var(--color-text-dark);
}

.delivery-details p {
  margin: 0;
  font-size: 0.9em;
  color: var(--color-grey-text);
}
</style>
