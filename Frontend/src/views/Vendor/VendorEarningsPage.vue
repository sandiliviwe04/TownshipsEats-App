<template>
  <div class="vendor-earnings-page">
    <AppHeader title="Earnings & Reports" show-back-button />

    <main class="main-content container">
      <div class="welcome-banner vendor-theme text-center">
        <h1 class="welcome-title">Your Financial Overview</h1>
        <p class="welcome-subtitle">Track your revenue and manage withdrawals.</p>
      </div>

      <section class="earnings-summary mb-4">
        <h2 class="section-title">Current Balance</h2>
        <div class="balance-card text-center">
          <p class="balance-label">Available for Withdrawal</p>
          <span class="balance-amount">R{{ currentBalance.toFixed(2) }}</span>
          <button class="btn-primary withdraw-btn" @click="initiateWithdrawal">
            Withdraw Earnings
          </button>
          <p class="last-withdrawal text-muted mt-2">Last withdrawal: {{ lastWithdrawalDate }}</p>
        </div>
      </section>

      <section class="sales-reports mb-4">
        <h2 class="section-title">Sales Reports</h2>
        <div class="reports-filter flex-between mb-3">
          <label for="reportPeriod" class="filter-label">View:</label>
          <select id="reportPeriod" v-model="reportPeriod" class="filter-select">
            <option value="today">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="allTime">All Time</option>
          </select>
        </div>

        <div v-if="loadingReports" class="loading-state text-center">
          <div class="spinner"></div>
          <p class="mt-3 text-muted">Loading reports...</p>
        </div>
        <div v-else class="report-details">
          <div class="report-card">
            <p class="report-label">Total Orders</p>
            <span class="report-value">{{ salesData.totalOrders }}</span>
          </div>
          <div class="report-card">
            <p class="report-label">Gross Revenue</p>
            <span class="report-value">R{{ salesData.grossRevenue.toFixed(2) }}</span>
          </div>
          <div class="report-card">
            <p class="report-label">Service Fees</p>
            <span class="report-value text-accent-red">-R{{ salesData.serviceFees.toFixed(2) }}</span>
          </div>
          <div class="report-card total">
            <p class="report-label">Net Earnings</p>
            <span class="report-value">R{{ salesData.netEarnings.toFixed(2) }}</span>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import AppHeader from '@/components/Shared/AppHeader.vue';
import AppFooter from '@/components/Shared/AppFooter.vue';

const currentBalance = ref(0.00);
const lastWithdrawalDate = ref('N/A');
const reportPeriod = ref('last7days');
const salesData = ref({
  totalOrders: 0,
  grossRevenue: 0.00,
  serviceFees: 0.00,
  netEarnings: 0.00,
});
const loadingReports = ref(true);

const fetchEarningsSummary = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  currentBalance.value = 850.75;
  lastWithdrawalDate.value = '2026-02-05';
};

const fetchSalesReports = async (period) => {
  loadingReports.value = true;
  await new Promise(resolve => setTimeout(resolve, 500));
  if (period === 'today') {
    salesData.value = {
      totalOrders: 10, grossRevenue: 500.00, serviceFees: 50.00, netEarnings: 450.00,
    };
  } else if (period === 'last7days') {
    salesData.value = {
      totalOrders: 75, grossRevenue: 3500.00, serviceFees: 350.00, netEarnings: 3150.00,
    };
  } else if (period === 'thisMonth') {
    salesData.value = {
      totalOrders: 200, grossRevenue: 8000.00, serviceFees: 800.00, netEarnings: 7200.00,
    };
  } else {
    salesData.value = {
      totalOrders: 500, grossRevenue: 20000.00, serviceFees: 2000.00, netEarnings: 18000.00,
    };
  }
  loadingReports.value = false;
};

const initiateWithdrawal = () => {
  if (currentBalance.value > 0) {
    alert(`Initiating withdrawal of R${currentBalance.value.toFixed(2)}. Funds will be transferred shortly.`);
    // In real app, trigger backend API for withdrawal
    currentBalance.value = 0.00;
    lastWithdrawalDate.value = new Date().toLocaleDateString('en-ZA');
  } else {
    alert('No funds available for withdrawal.');
  }
};

watch(reportPeriod, (newPeriod) => {
  fetchSalesReports(newPeriod);
});

onMounted(() => {
  fetchEarningsSummary();
  fetchSalesReports(reportPeriod.value);
});
</script>

<style scoped>
.vendor-earnings-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-background-light);
}

.main-content {
  flex-grow: 1;
  padding: 1rem;
  padding-bottom: 70px;
  max-width: 800px;
  margin: 0 auto;
}

.welcome-banner.vendor-theme {
  background-color: var(--color-secondary-green);
  color: var(--color-text-light);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
}

.welcome-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-dark);
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-border-light);
}

.earnings-summary,.sales-reports {
  background-color: var(--color-text-light);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
}

.balance-card {
  text-align: center;
  padding: 1rem 0;
}

.balance-label {
  font-size: 1rem;
  color: var(--color-grey-text);
  margin-bottom: 0.5rem;
}

.balance-amount {
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-secondary-green);
  display: block; /* Ensures it's on its own line */
  margin-bottom: 1.5rem;
}

.btn-primary.withdraw-btn { /* Reusing primary button style */
  background-color: var(--color-primary-orange);
  color: var(--color-text-light);
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-primary.withdraw-btn:hover {
  background-color: #e06a30;
}

.last-withdrawal {
  font-size: 0.85rem;
  color: var(--color-grey-text);
}

.reports-filter { /* Uses flex-between */
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-label {
  font-weight: bold;
  color: var(--color-text-dark);
}

.filter-select { /* Reusing filter select style */
  flex-grow: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  font-size: 1rem;
  background-color: var(--color-text-light);
  color: var(--color-text-dark);
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2C114.7L158.4%2C243.3c-2.4%2C2.4-5.4%2C3.6-8.7%2C3.6s-6.3-1.2-8.7-3.6L5.4%2C114.7c-4.8-4.8-4.8-12.5%2C0-17.3c4.8-4.8%2C12.5-4.8%2C17.3%2C0l129.5%2C129.6L269.7%2C97.4c4.8-4.8%2C12.5-4.8%2C17.3%2C0C291.9%2C102.2%2C291.9%2C109.9%2C287%2C114.7z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
}
.filter-select:focus {
  border-color: var(--color-secondary-green);
  outline: none;
}

.report-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.report-card {
  background-color: var(--color-background-light);
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.report-card.total {
  background-color: var(--color-secondary-green);
  color: var(--color-text-light);
}

.report-label {
  font-size: 0.9rem;
  color: var(--color-grey-text);
  margin-bottom: 0.5rem;
}

.report-card.total.report-label {
  color: rgba(255, 255, 255, 0.8);
}

.report-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-text-dark);
}
.report-card.total.report-value {
  color: var(--color-text-light);
}

.text-accent-red {
  color: var(--color-accent-red);
}

/* Spinner and text-muted styles repeated for context */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid var(--color-primary-orange);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.text-muted { color: var(--color-grey-text); }
.mt-3 { margin-top: 1.5rem; }
.mb-3 { margin-bottom: 1.5rem; }
</style>