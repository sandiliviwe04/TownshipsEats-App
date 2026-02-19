<!-- Frontend/src/views/Vendor/VendorDashboardPage.vue -->
<template>
  <div class="vendor-dashboard-page">
    <div class="page-card dashboard-card">
      <h2 class="text-center">Vendor Dashboard</h2>
      <p class="text-center">Welcome, {{ vendorName }}! Manage your orders and menu here.</p>

      <div class="dashboard-sections">
        <div class="section-item">
          <h3>Current Orders</h3>
          <p>You have <strong>{{ currentOrders }}</strong> pending orders.</p>
          <PrimaryButton text="View Orders" type="primary" @click="goToOrders" />
        </div>
        <div class="section-item">
          <h3>Menu Management</h3>
          <p>Update your dishes and prices.</p>
          <PrimaryButton text="Edit Menu" type="primary" @click="goToMenuManagement" />
        </div>
        <div class="section-item">
          <h3>Earnings Report</h3>
          <p>Check your latest earnings.</p>
          <PrimaryButton text="View Reports" type="primary" @click="goToReports" />
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

const vendorName = ref('Mama Thandi\'s Kitchen');
const currentOrders = ref(3);

const goToOrders = () => {
  router.push('/vendor/orders');
};

const goToMenuManagement = () => {
  router.push('/vendor/menu-management');
};

const goToReports = () => {
  router.push('/vendor/reports');
};
</script>

<style scoped>
/* (No changes to existing styles) */
.vendor-dashboard-page {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #fff5ec, #ffe8d6);
}

.dashboard-card {
  max-width: 900px;
  width: 100%;
}

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