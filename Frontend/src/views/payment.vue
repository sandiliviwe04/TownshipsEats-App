<template>
  <div class="payment-container">
    <h1>Checkout</h1>
    <button @click="createPayment">Pay with PayFast</button>
  </div>
</template>

<script>
export default {
  name: "PaymentPage",
  methods: {
    async createPayment() {
      try {
        const response = await fetch('http://localhost:5400/api/payfast/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name: 'Che',
            last_name: 'Fernandez',
            email: 'che@example.com',
            amount: '100',          // must be string
            item_name: 'Test Meal',
            item_description: 'Sample description',
            order_id: 'order123'    // unique ID
          })
        });

        if (response.redirected) {
          window.location.href = response.url; // redirect to sandbox
        } else {
          const data = await response.text();
          console.log('Payment initiation failed:', data);
        }

      } catch (error) {
        console.error('Payment initiation failed:', error);
      }
    }
  }
}
</script>

<style>
.payment-container { text-align: center; margin-top: 50px; }
button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
</style>

