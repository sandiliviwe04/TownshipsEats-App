<!-- Frontend/src/views/Customer/OrderHistoryPage.vue -->
<template>
  <div class="order-history-page">
    <div class="page-card history-card">
      <h2 class="text-center mb-20">Your Order History</h2>
      <p class="text-center intro-text mb-40" v-if="orders.length === 0">You haven't placed any orders yet.</p>

      <div class="order-list" v-else>
        <div v-for="order in orders" :key="order.id" class="order-item">
          <div class="order-header flex-between">
            <h4>Order #{{ order.id }}</h4>
            <span :class="['order-status', order.status.toLowerCase().replace(' ', '-')]">{{ order.status }}</span>
          </div>
          <div class="order-body">
            <p><strong>Date:</strong> {{ order.date }}</p>
            <p><strong>Total:</strong> R{{ order.total.toFixed(2) }}</p>
            <p><strong>Items:</strong></p>
            <ul>
              <li v-for="item in order.items" :key="item.id">{{ item.quantity }}x {{ item.name }}</li>
            </ul>
          </div>
          <div class="order-actions text-right">
            <PrimaryButton text="Track Order" type="primary" @click="trackOrder(order.id)" class="mr-10" v-if="order.status !== 'Delivered'" />
            <PrimaryButton text="Reorder" type="success" @click="reorder(order.id)" />
          </div>
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

const orders = ref([
  {
    id: 'TX20240115-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 180.00,
    items: [
      { id: 101, name: 'Kota Special', quantity: 1 },
      { id: 201, name: 'Margherita Pizza', quantity: 1 },
    ],
  },
  {
    id: 'TX20240120-002',
    date: '2024-01-20',
    status: 'Delivered',
    total: 75.00,
    items: [
      { id: 302, name: 'Mogodu & Pap', quantity: 1 },
    ],
  },
  {
    id: 'TX20240205-003',
    date: '2024-02-05',
    status: 'Preparing',
    total: 85.00,
    items: [
      { id: 101, name: 'Cheese Burger', quantity: 1 },
    ],
  },
]);

const trackOrder = (orderId) => {
  router.push(`/customer/order-tracking/${orderId}`);
};

const reorder = (orderId) => {
  alert(`Reordering items from Order ${orderId}. (Not implemented fully)`);
  // In a real app, this would add items to the cart and navigate to the cart page
};
</script>

<style scoped>
.order-history-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.history-card {
  max-width: 800px;
  width: 100%;
}

.intro-text {
  color: var(--color-grey-text);
  font-style: italic;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.order-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 20px;
  text-align: left;
}

.order-header {
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.order-header h4 {
  margin: 0;
  color: var(--color-text-dark);
  font-size: 1.2em;
}

.order-status {
  padding: 4px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.9em;
  color: white;
}

.order-status.pending { background-color: #ffc107; color: var(--color-text-dark); }
.order-status.preparing { background-color: var(--color-primary-orange); }
.order-status.ready-for-pickup { background-color: #007bff; }
.order-status.picked-up { background-color: #6f42c1; }
.order-status.delivered { background-color: var(--color-secondary-green); }

.order-body p {
  margin-bottom: 5px;
  color: var(--color-grey-text);
}

.order-body ul {
  list-style-type: disc;
  margin-left: 20px;
  padding-left: 0;
  color: var(--color-grey-text);
}

.order-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.mr-10 {
  margin-right: 10px;
}
</style>