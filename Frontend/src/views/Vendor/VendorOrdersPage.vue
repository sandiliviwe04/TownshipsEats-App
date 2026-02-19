<!-- Frontend/src/views/Vendor/VendorOrdersPage.vue -->
<template>
  <div class="vendor-orders-page">
    <div class="page-card orders-card">
      <BackButton class="mb-20">Back to Dashboard</BackButton>
      <h2 class="text-center mb-20">Vendor Orders</h2>
      <p class="text-center mb-20" v-if="orders.length === 0">No orders received yet.</p>

      <div class="orders-list" v-else>
        <div v-for="order in orders" :key="order.id" class="order-item">
          <div class="order-header flex-between">
            <h4>Order #{{ order.id }}</h4>
            <span :class="['order-status', order.status.toLowerCase().replace(' ', '-')]">{{ order.status }}</span>
          </div>
          <div class="order-body">
            <p><strong>Customer:</strong> {{ order.customerName }}</p>
            <p><strong>Total:</strong> R{{ order.total.toFixed(2) }}</p>
            <p><strong>Items:</strong></p>
            <ul>
              <li v-for="item in order.items" :key="item.id">{{ item.quantity }}x {{ item.name }}</li>
            </ul>
          </div>
          <div class="order-actions text-right">
            <PrimaryButton v-if="order.status === 'Pending'" text="Accept Order" type="success" class="mr-10" @click="updateOrderStatus(order.id, 'Preparing')" />
            <PrimaryButton v-if="order.status === 'Preparing'" text="Mark Ready" type="primary" class="mr-10" @click="updateOrderStatus(order.id, 'Ready for Pickup')" />
            <PrimaryButton v-if="order.status === 'Ready for Pickup'" text="Mark Picked Up" type="secondary" @click="updateOrderStatus(order.id, 'Picked Up')" />
            <PrimaryButton v-if="order.status === 'Picked Up'" text="Mark Delivered" type="secondary" @click="updateOrderStatus(order.id, 'Delivered')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BackButton from '../../components/Shared/BackButton.vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';

const orders = ref([
  {
    id: 'VORD101',
    customerName: 'John Doe',
    status: 'Pending',
    total: 145.00,
    items: [
      { id: 101, name: 'Kota Special', quantity: 1 },
      { id: 201, name: 'Margherita Pizza', quantity: 1 },
    ],
  },
  {
    id: 'VORD102',
    customerName: 'Jane Smith',
    status: 'Preparing',
    total: 75.00,
    items: [
      { id: 302, name: 'Mogodu & Pap', quantity: 1 },
    ],
  },
  {
    id: 'VORD103',
    customerName: 'Peter Jones',
    status: 'Picked Up',
    total: 85.00,
    items: [
      { id: 101, name: 'Cheese Burger', quantity: 1 },
    ],
  },
  {
    id: 'VORD104',
    customerName: 'Alice Khumalo',
    status: 'Delivered',
    total: 110.00,
    items: [
      { id: 202, name: 'Pepperoni Pizza', quantity: 1 },
    ],
  },
]);

const updateOrderStatus = (orderId, newStatus) => {
  const orderIndex = orders.value.findIndex(o => o.id === orderId);
  if (orderIndex!== -1) {
    orders.value[orderIndex].status = newStatus;
    alert(`Order ${orderId} status updated to ${newStatus}`);
    // In a real app, this would be an API call
  }
};
</script>

<style scoped>
.vendor-orders-page {
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
  padding: 20px;
}

.orders-card {
  max-width: 800px;
  width: 100%;
}

.orders-list {
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

.order-status.pending { background-color: #ffc107; color: var(--color-text-dark); } /* Yellow */
.order-status.preparing { background-color: var(--color-primary-orange); } /* Orange */
.order-status.ready-for-pickup { background-color: #007bff; } /* Blue */
.order-status.picked-up { background-color: #6f42c1; } /* Purple */
.order-status.delivered { background-color: var(--color-secondary-green); } /* Green */

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