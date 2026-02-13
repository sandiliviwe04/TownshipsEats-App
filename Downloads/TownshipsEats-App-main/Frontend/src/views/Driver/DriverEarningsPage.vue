<!-- Frontend/src/views/Driver/DriverEarningsPage.vue -->
<template>
  <div class="driver-earnings-page">
    <div class="page-card earnings-card">
      <BackButton class="mb-20">Back to Dashboard</BackButton>
      <h2 class="text-center mb-20">Your Earnings</h2>
      <p class="text-center intro-text mb-40">A detailed look at your delivery earnings.</p>

      <div class="earnings-summary">
        <div class="summary-item">
          <h3>Total This Week</h3>
          <p class="summary-value">R{{ totalWeek.toFixed(2) }}</p>
        </div>
        <div class="summary-item">
          <h3>Total This Month</h3>
          <p class="summary-value">R{{ totalMonth.toFixed(2) }}</p>
        </div>
        <div class="summary-item">
          <h3>Deliveries Completed</h3>
          <p class="summary-value">{{ deliveriesCompleted }}</p>
        </div>
      </div>

      <h3 class="mt-40 mb-20 text-center">Earnings History</h3>
      <div class="history-list">
        <div v-for="earning in earningsHistory" :key="earning.id" class="history-item flex-between">
          <div>
            <span>{{ earning.date }} - Order #{{ earning.orderId }}</span>
            <p class="delivery-details">{{ earning.pickupLocation }} to {{ earning.dropoffLocation }}</p>
          </div>
          <span class="earning-amount">R{{ earning.amount.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BackButton from '../../components/Shared/BackButton.vue';

const totalWeek = ref(1250.00);
const totalMonth = ref(4500.00);
const deliveriesCompleted = ref(85);

const earningsHistory = ref([
  { id: 1, date: '2026-02-12', orderId: 'ORD123', amount: 35.00, pickupLocation: 'Kasi Flavours', dropoffLocation: 'Street A' },
  { id: 2, date: '2026-02-12', orderId: 'ORD124', amount: 40.00, pickupLocation: 'Gourmet Grills', dropoffLocation: 'Street B' },
  { id: 3, date: '2026-02-11', orderId: 'ORD121', amount: 30.00, pickupLocation: 'Curry Delight', dropoffLocation: 'Street Z' },
  { id: 4, date: '2026-02-11', orderId: 'ORD122', amount: 50.00, pickupLocation: 'Pizza Zone', dropoffLocation: 'Street Y' },
]);
</script>

<style scoped>
.driver-earnings-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.earnings-card {
  max-width: 800px;
  width: 100%;
}

.intro-text {
  color: var(--color-grey-text);
  font-style: italic;
}

.earnings-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
  text-align: center;
}

.summary-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px;
}

.summary-item h3 {
  color: var(--color-grey-text);
  margin-bottom: 10px;
  font-size: 1.1em;
}

.summary-value {
  font-size: 2.2em;
  font-weight: bold;
  color: var(--color-primary-orange);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.history-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.history-item span {
  color: var(--color-text-dark);
  font-weight: bold;
}

.history-item p.delivery-details {
  font-size: 0.85em;
  color: var(--color-grey-text);
  margin-top: 5px;
}

.earning-amount {
  font-weight: bold;
  color: var(--color-secondary-green);
  font-size: 1.1em;
}
</style>