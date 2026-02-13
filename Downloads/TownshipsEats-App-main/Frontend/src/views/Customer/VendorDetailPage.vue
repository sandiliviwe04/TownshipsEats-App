<!-- Frontend/src/views/Customer/VendorDetailPage.vue -->
<template>
  <div class="vendor-detail-page">
    <div class="page-card vendor-detail-card">
      <BackButton class="mb-20">Back to Home</BackButton>
      
      <div v-if="vendor">
        <h2 class="text-center mb-10">{{ vendor.name }}</h2>
        <p class="text-center vendor-cuisine mb-20">{{ vendor.cuisine }}</p>

        <img :src="vendor.bannerImage" :alt="vendor.name" class="vendor-banner">

        <h3 class="mt-40 mb-20">Menu</h3>
        <div class="menu-list">
          <MealCard v-for="item in vendor.menu" :key="item.id" :meal="item" @add-to-cart="handleAddToCart" />
        </div>
      </div>
      <div v-else class="text-center">
        <p>Loading vendor details...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import BackButton from '../../components/Shared/BackButton.vue'; // Import BackButton
import MealCard from '../../components/Customer/MealCard.vue'; // Import MealCard

const route = useRoute();
const vendor = ref(null);

const dummyVendors = [
  {
    id: 1,
    name: 'Kasi Flavours',
    cuisine: 'Traditional SA',
    bannerImage: 'https://via.placeholder.com/800x200/ff7f00/ffffff?text=Kasi+Flavours+Banner',
    menu: [
      { id: 101, name: 'Kota Special', description: 'Classic Kota with all the trimmings.', price: 60.00, image: 'https://via.placeholder.com/90/ff7f00/ffffff?text=Kota' },
      { id: 102, name: 'Mogodu & Pap', description: 'Traditional tripe and pap.', price: 75.00, image: 'https://via.placeholder.com/90/28a745/ffffff?text=Mogodu' },
      { id: 103, name: 'Skop', description: 'Grilled lamb head, a local delicacy.', price: 90.00, image: 'https://via.placeholder.com/90/ff7f00/ffffff?text=Skop' },
    ],
  },
  {
    id: 2,
    name: 'Gourmet Grills',
    cuisine: 'Burgers & BBQ',
    bannerImage: 'https://via.placeholder.com/800x200/28a745/ffffff?text=Gourmet+Grills+Banner',
    menu: [
      { id: 201, name: 'Cheese Burger', description: 'Juicy patty with cheddar.', price: 85.00, image: 'https://via.placeholder.com/90/28a745/ffffff?text=Burger' },
      { id: 202, name: 'Ribs Platter', description: 'Tender BBQ ribs with fries.', price: 150.00, image: 'https://via.placeholder.com/90/ff7f00/ffffff?text=Ribs' },
    ],
  },
];

onMounted(() => {
  const vendorId = parseInt(route.params.id);
  vendor.value = dummyVendors.find(v => v.id === vendorId);
});

const handleAddToCart = (item) => {
  alert(`Added ${item.name} to cart!`);
  console.log('Add to cart:', item);
};
</script>

<style scoped>
.vendor-detail-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.vendor-detail-card {
  max-width: 900px;
  width: 100%;
  text-align: left;
}

.mb-20 {
  margin-bottom: 20px;
}

.vendor-cuisine {
  color: var(--color-grey-text);
  font-style: italic;
}

.vendor-banner {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 30px;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>