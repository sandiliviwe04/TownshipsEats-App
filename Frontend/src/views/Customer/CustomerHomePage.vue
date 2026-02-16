<!-- Frontend/src/views/Customer/CustomerHomePage.vue -->
<template>
  <div class="customer-home-page">
    <div class="page-card home-card">
      <h2 class="text-center mb-20">Welcome to TownshipEats!</h2>
      <p class="text-center mb-20">Discover delicious food from local vendors.</p>

      <div class="section">
        <h3>Featured Vendors</h3>
        <div class="vendor-list">
          <VendorCard v-for="vendor in featuredVendors" :key="vendor.id" :vendor="vendor" />
        </div>
      </div>

      <div class="section mt-40">
        <h3>Popular Categories</h3>
        <div class="category-list">
          <div v-for="category in popularCategories" :key="category.id" class="home-category-item">
            <img :src="category.image" :alt="category.name" class="home-category-image">
            <h5>{{ category.name }}</h5>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VendorCard from '../../components/Customer/VendorCard.vue'; // Import VendorCard

const featuredVendors = ref([
  { id: 1, name: 'Kasi Flavours', cuisine: 'Traditional SA', image: 'https://via.placeholder.com/120/ff7f00/ffffff?text=Vendor1', rating: 4.5, reviews: 120 },
  { id: 2, name: 'Gourmet Grills', cuisine: 'Burgers & BBQ', image: 'https://via.placeholder.com/120/28a745/ffffff?text=Vendor2', rating: 4.8, reviews: 95 },
  { id: 3, name: 'Curry Delight', cuisine: 'Indian', image: 'https://via.placeholder.com/120/ff7f00/ffffff?text=Vendor3', rating: 4.2, reviews: 70 },
  { id: 4, name: 'Pizza Zone', cuisine: 'Italian', image: 'https://via.placeholder.com/120/28a745/ffffff?text=Vendor4', rating: 4.0, reviews: 150 },
]);

const popularCategories = ref([
  { id: 1, name: 'Pizza', image: 'https://via.placeholder.com/80/28a745/ffffff?text=Pizza' },
  { id: 2, name: 'Chicken', image: 'https://via.placeholder.com/80/ff7f00/ffffff?text=Chicken' },
  { id: 3, name: 'African', image: 'https://via.placeholder.com/80/28a745/ffffff?text=African' },
  { id: 4, name: 'Desserts', image: 'https://via.placeholder.com/80/ff7f00/ffffff?text=Desserts' },
]);
</script>

<style scoped>
.customer-home-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.home-card {
  max-width: 1200px;
  width: 100%;
}

.section {
  margin-bottom: 40px;
}

.section h3 {
  border-bottom: 2px solid var(--color-primary-orange);
  padding-bottom: 10px;
  margin-bottom: 25px;
  color: var(--color-text-dark);
  font-size: 1.5em;
  text-align: left;
}

.vendor-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.category-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.home-category-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 15px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.home-category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.home-category-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid var(--color-primary-orange);
}

.home-category-item h5 {
  margin: 0;
  color: var(--color-text-dark);
}
</style>