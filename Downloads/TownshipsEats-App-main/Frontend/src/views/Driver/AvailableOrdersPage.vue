<!-- Frontend/src/views/Driver/AvailableOrdersPage.vue -->
<template>
  <div class="available-orders-page">
    <div class="page-card available-card">
      <BackButton class="mb-20">Back to Dashboard</BackButton>
      <h2 class="text-center mb-20">Available Deliveries</h2>
      <p class="text-center intro-text mb-40" v-if="availableDeliveries.length === 0">No new deliveries available right now. Check back soon!</p>

      <div class="delivery-list" v-else>
        <div v-for="delivery in availableDeliveries" :key="delivery.id" class="delivery-item">
          <div class="delivery-details">
            <h4>Order #{{ delivery.id }}</h4>
            <p><strong>Pickup:</strong> {{ delivery.pickupLocation }}</p>
            <p><strong>Dropoff:</strong> {{ delivery.dropoffLocation }}</p>
            <p><strong>Est. Earnings:</strong> R{{ delivery.earning.toFixed(2) }}</p>
            <p class="distance"><strong>Distance:</strong> {{ delivery.distance }} km</p>
          </div>
          <PrimaryButton text="Accept Delivery" type="success" @click="acceptDelivery(delivery.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BackButton from '../../components/Shared/BackButton.vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';

const availableDeliveries = ref([
  { id: 'ORD125', pickupLocation: 'Kasi Flavours (123 Main St)', dropoffLocation: 'Street A, House 123 (5km)', earning: 35.00, distance: 5.2 },
  { id: 'ORD126', pickupLocation: 'Gourmet Grills (456 Side Ave)', dropoffLocation: 'Street B, Flat 4 (8km)', earning: 40.00, distance: 8.1 },
  { id: 'ORD127', pickupLocation: 'Curry Delight (789 Loop Rd)', dropoffLocation: 'Street C, Building 10 (3km)', earning: 28.00, distance: 3.5 },
]);

const acceptDelivery = (deliveryId) => {
  alert(`Delivery ${deliveryId} accepted! It will now appear in your active deliveries.`);
  availableDeliveries.value = availableDeliveries.value.filter(d => d.id !== deliveryId);
  // In a real app, this would update a backend service and move to active orders
};
</script>

<style scoped>
.available-orders-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.available-card {
  max-width: 800px;
  width: 100%;
}

.intro-text {
  color: var(--color-grey-text);
  font-style: italic;
}

.delivery-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.delivery-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.delivery-details {
  flex-grow: 1;
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

.delivery-details .distance {
  font-style: italic;
  font-size: 0.85em;
  color: var(--color-primary-orange);
}
</style>