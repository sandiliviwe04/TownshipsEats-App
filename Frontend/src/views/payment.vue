<template>
  <div class="payment-container">
    <h1>Payment Page</h1>
    <p>Redirecting to PayFast...</p>
  </div>
</template>

<script>
export default {
  name: "PaymentPage",
  mounted() {
    // Automatically trigger payment when the page loads
    this.createPayment();
  },
  methods: {
    async createPayment() {
      try {
        const response = await fetch('http://localhost:5000/api/payfast/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: 'Che',
            last_name: 'Fernandez',
            email: 'che@example.com',
            amount: '100',          // amount in string format
            item_name: 'Test Meal',
            item_description: 'Sample description',
            order_id: 'order123'    // unique order ID
          })
        });

        // If backend returns a redirect URL
        if (response.redirected) {
          window.location.href = response.url;
        } else {
          const data = await response.text();
          console.log(data);
        }

      } catch (error) {
        console.error('Payment initiation failed:', error);
      }
    }
  }
}
</script>
