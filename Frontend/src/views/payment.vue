<template>
  <div class="payment-container">
    <h1>Checkout</h1>
    
    <div v-if="success" class="success">{{ success }}</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="debugInfo" class="debug">{{ debugInfo }}</div>

    <!-- Hidden form that will be submitted -->
    <form ref="payfastForm" method="POST" :action="payfastUrl" style="display: none;">
      <input v-for="(value, key) in payfastData" 
             :key="key" 
             type="hidden" 
             :name="key" 
             :value="value" />
    </form>

    <button v-if="!success && !submitting" @click="createPayment" :disabled="loading">
      {{ loading ? "Processing..." : "Pay with PayFast" }}
    </button>
    
    <div v-if="submitting" class="info">
      Redirecting to PayFast secure payment page...
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentPage",
  data() {
    return {
      loading: false,
      submitting: false,
      success: null,
      error: null,
      debugInfo: null,
      payfastUrl: null,
      payfastData: null
    };
  },
  methods: {
    async createPayment() {
      this.loading = true;
      this.error = null;
      this.success = null;
      this.debugInfo = "Sending payment request...";
      this.payfastUrl = null;
      this.payfastData = null;

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payfast/pay`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true" // ADD THIS HEADER
          },
          body: JSON.stringify({
            first_name: "imaan",
            last_name: "cummings",
            email: "imaan@gmail.com",
            amount: "100.00",
            item_name: "Test Meal",
            item_description: "Sample description",
            order_id: `order-${Date.now()}`
          }),
        });

        this.debugInfo = `Response status: ${response.status}`;

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.debugInfo = `Response received: ${JSON.stringify(data)}`;

        if (data.success && data.url && data.data) {
          this.success = "Payment initialized! Redirecting to PayFast...";
          
          // Store the URL and data
          this.payfastUrl = data.url;
          this.payfastData = data.data;

          console.log('🔥 Form action (URL):', this.payfastUrl);
          console.log('🔥 Form data being submitted:', this.payfastData);
          console.log('🔥 Full payment object:', JSON.stringify(this.payfastData, null, 2));
          console.log('🔥 Form action (URL):', this.payfastUrl);
          // Submit the form after a brief delay
          setTimeout(() => {
            this.submitting = true;
            this.$refs.payfastForm.submit();
          }, 1500);
        } else {
          this.error = data.error || "Payment initiation failed";
        }
      } catch (err) {
        console.error("Payment error:", err);
        this.error = `Error: ${err.message}`;
        this.debugInfo = err.toString();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.payment-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: white;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

button {
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: #f44336;
  margin-top: 10px;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
  border: 1px solid #f44336;
}

.success {
  color: #4caf50;
  margin-top: 10px;
  padding: 10px;
  background-color: #e8f5e8;
  border-radius: 4px;
  border: 1px solid #4caf50;
  font-weight: bold;
}

.info {
  color: #2196f3;
  margin-top: 10px;
  padding: 10px;
  background-color: #e3f2fd;
  border-radius: 4px;
  border: 1px solid #2196f3;
}

.debug {
  color: #666;
  margin-top: 10px;
  font-size: 12px;
  text-align: left;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  word-break: break-all;
  border: 1px solid #ddd;
  max-height: 200px;
  overflow: auto;
}
</style>