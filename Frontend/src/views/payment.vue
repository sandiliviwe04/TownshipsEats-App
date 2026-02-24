<template>
  <div class="payment-container">
    <h1>Checkout</h1>
    
    <div v-if="loading" class="text-center">
      <p>Loading your cart...</p>
    </div>
    
    <div v-else>
      <div class="order-summary">
        <h3>Order Summary</h3>
        <div v-if="!cart.items || cart.items.length === 0" class="text-center">
          <p>Your cart is empty. <RouterLink to="/customer/home">Go back shopping</RouterLink></p>
        </div>
        <div v-else>
          <div v-for="item in cart.items" :key="item.id" class="summary-item">
            <span>{{ item.name }} x{{ item.quantity }}</span>
            <span>R{{ (Number(item.unit_price) * Number(item.quantity)).toFixed(2) }}</span>
          </div>
          <div class="summary-line">
            <span>Subtotal:</span>
            <span>R{{ Number(cart.subtotal || 0).toFixed(2) }}</span>
          </div>
          <div class="summary-line">
            <span>Delivery Fee:</span>
            <span>R{{ Number(cart.delivery_fee || 25.00).toFixed(2) }}</span>
          </div>
          <div class="summary-total">
            <strong>Total: R{{ calculateTotal().toFixed(2) }}</strong>
          </div>
        </div>
      </div>
      
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

      <button v-if="cart.items && cart.items.length > 0 && !success && !submitting" @click="createPayment" :disabled="loading">
        {{ loading ? "Processing..." : `Pay R${calculateTotal().toFixed(2)} with PayFast` }}
      </button>
      
      <div v-if="submitting" class="info">
        Redirecting to PayFast secure payment page...
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
  name: "PaymentPage",
  data() {
    return {
      loading: true,
      submitting: false,
      success: null,
      error: null,
      debugInfo: null,
      payfastUrl: null,
      payfastData: null,
      cart: { items: [], subtotal: 0, delivery_fee: 25.00, total: 0 }
    };
  },
  async created() {
    await this.fetchCart();
  },
  methods: {
    async fetchCart() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5401/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.success) {
          this.cart = response.data.data;
          console.log('Cart loaded:', this.cart);
        }
      } catch (err) {
        console.error('Error fetching cart:', err);
        this.error = 'Failed to load cart';
      } finally {
        this.loading = false;
      }
    },
    
    calculateTotal() {
      const subtotal = Number(this.cart.subtotal || 0);
      const deliveryFee = Number(this.cart.delivery_fee || 25.00);
      return subtotal + deliveryFee;
    },
    
    async createPayment() {
      this.loading = true;
      this.error = null;
      this.success = null;
      this.debugInfo = "Sending payment request...";
      this.payfastUrl = null;
      this.payfastData = null;

      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        const totalAmount = this.calculateTotal().toFixed(2);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payfast/pay`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
          },
          body: JSON.stringify({
            first_name: user.username || "Customer",
            last_name: "",
            email: user.email || "customer@example.com",
            amount: totalAmount,
            item_name: `Order from ${this.cart.vendor_name || 'TownshipsEats'}`,
            item_description: `${this.cart.items?.length || 0} items`,
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
          this.success = `Payment of R${totalAmount} initialized! Redirecting to PayFast...`;
          
          this.payfastUrl = data.url;
          this.payfastData = data.data;

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
/* Keep your existing CSS exactly the same */
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

.order-summary {
  text-align: left;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #ddd;
  text-align: right;
  font-size: 1.2em;
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

.text-center {
  text-align: center;
}
</style>