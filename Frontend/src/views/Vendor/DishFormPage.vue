<!-- Frontend/src/views/Vendor/DishFormPage.vue -->
<template>
  <div class="dish-form-page">
    <div class="page-card dish-form-card">
      <BackButton class="mb-20">Back to Menu Management</BackButton>
      <h2 class="text-center mb-20">{{ isEditing? 'Edit Dish' : 'Add New Dish' }}</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="dishName">Dish Name:</label>
          <input type="text" id="dishName" v-model="dish.name" required>
        </div>
        <div class="form-group">
          <label for="dishDescription">Description:</label>
          <textarea id="dishDescription" v-model="dish.description" rows="4" required></textarea>
        </div>
        <div class="form-group">
          <label for="dishPrice">Price (R):</label>
          <input type="number" id="dishPrice" v-model="dish.price" min="0" step="0.01" required>
        </div>
        <div class="form-group">
          <label for="dishImage">Image URL:</label>
          <input type="url" id="dishImage" v-model="dish.image" placeholder="e.g., https://via.placeholder.com/90">
        </div>
        <div class="form-group">
          <label for="dishCategory">Category:</label>
          <select id="dishCategory" v-model="dish.category" required>
            <option value="">Select a Category</option>
            <option value="Burgers">Burgers</option>
            <option value="Pizza">Pizza</option>
            <option value="Traditional">Traditional</option>
            <option value="Desserts">Desserts</option>
            <option value="Drinks">Drinks</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>
        </div>

        <PrimaryButton :text="isEditing? 'Update Dish' : 'Add Dish'" type="primary" :fullWidth="true" class="mt-20" />
        <PrimaryButton v-if="isEditing" text="Cancel" type="secondary" :fullWidth="true" class="mt-10" @click="router.push('/vendor/menu-management')" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BackButton from '../../components/Shared/BackButton.vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';

const route = useRoute();
const router = useRouter();

const isEditing = ref(false);
const dish = ref({
  id: null,
  name: '',
  description: '',
  price: 0.00,
  image: '',
  category: '',
});

// Dummy menu items for editing simulation
const dummyMenuItems = [
  { id: 1, name: 'Kota Special', description: 'Classic Kota with all the trimmings.', price: 60.00, image: 'https://via.placeholder.com/50/ff7f00/ffffff?text=D1', category: 'Traditional' },
  { id: 2, name: 'Mogodu & Pap', description: 'Traditional tripe and pap.', price: 75.00, image: 'https://via.placeholder.com/50/28a745/ffffff?text=D2', category: 'Traditional' },
  { id: 3, name: 'Boerewors Roll', description: 'Grilled boerewors in a bun.', price: 40.00, image: 'https://via.placeholder.com/50/ff7f00/ffffff?text=D3', category: 'Burgers' },
];

onMounted(() => {
  if (route.params.id) {
    isEditing.value = true;
    const dishId = parseInt(route.params.id);
    const existingDish = dummyMenuItems.find(d => d.id === dishId);
    if (existingDish) {
      dish.value = {...existingDish }; // Populate form for editing
    } else {
      alert('Dish not found!');
      router.push('/vendor/menu-management');
    }
  }
});

const handleSubmit = () => {
  if (isEditing.value) {
    alert(`Updating dish: ${dish.value.name} (ID: ${dish.value.id})`);
  } else {
    alert(`Adding new dish: ${dish.value.name}`);
  }
  console.log('Dish data:', dish.value);
  // In a real app, send to API then redirect to menu management
  router.push('/vendor/menu-management');
};
</script>

<style scoped>
.dish-form-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.dish-form-card {
  max-width: 600px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: var(--color-text-dark);
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="url"],
.form-group textarea,
.form-group select {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid var(--color-border-light);
  border-radius: 5px;
  font-size: 1em;
  background-color: var(--color-background-light);
  color: var(--color-text-dark);
}

.form-group textarea {
  resize: vertical;
}

.mt-10 {
  margin-top: 10px;
}
</style>