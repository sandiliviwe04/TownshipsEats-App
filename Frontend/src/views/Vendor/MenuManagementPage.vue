<!-- Frontend/src/views/Vendor/MenuManagementPage.vue -->
<template>
  <div class="menu-management-page">
    <div class="page-card menu-card">
      <BackButton class="mb-20">Back to Dashboard</BackButton>
      <h2 class="text-center mb-20">Menu Management</h2>
      <p class="text-center mb-20">Add, edit, or remove dishes from your menu.</p>

      <PrimaryButton text="Add New Dish" type="success" :fullWidth="false" class="add-dish-btn mb-20" @click="goToAddDish" />

      <div class="dish-list">
        <div v-for="dish in menuDishes" :key="dish.id" class="dish-item flex-between">
          <div class="dish-info">
            <img :src="dish.image" :alt="dish.name" class="dish-image">
            <div>
              <h4>{{ dish.name }}</h4>
              <p class="dish-description">{{ dish.description }}</p>
            </div>
          </div>
          <div class="dish-actions">
            <span class="dish-price">R{{ dish.price.toFixed(2) }}</span>
            <PrimaryButton text="Edit" type="primary" size="small" @click="goToEditDish(dish.id)" />
            <PrimaryButton text="Delete" type="danger" size="small" @click="deleteDish(dish.id)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import BackButton from '../../components/Shared/BackButton.vue';
import PrimaryButton from '../../components/Shared/PrimaryButton.vue';

const router = useRouter(); // Initialize router

const menuDishes = ref([
  { id: 1, name: 'Kota Special', description: 'Classic Kota with all the trimmings.', price: 60.00, image: 'https://via.placeholder.com/50/ff7f00/ffffff?text=D1' },
  { id: 2, name: 'Mogodu & Pap', description: 'Traditional tripe and pap.', price: 75.00, image: 'https://via.placeholder.com/50/28a745/ffffff?text=D2' },
  { id: 3, name: 'Boerewors Roll', description: 'Grilled boerewors in a bun.', price: 40.00, image: 'https://via.placeholder.com/50/ff7f00/ffffff?text=D3' },
]);

const goToAddDish = () => {
  router.push({ name: 'AddDish' });
};

const goToEditDish = (dishId) => {
  router.push({ name: 'EditDish', params: { id: dishId } });
};

const deleteDish = (dishId) => {
  if (confirm(`Are you sure you want to delete dish ID ${dishId}?`)) {
    menuDishes.value = menuDishes.value.filter(dish => dish.id!== dishId);
    alert(`Dish ${dishId} deleted!`);
    // In a real app, send API call to delete
  }
};
</script>

<style scoped>
/* (No changes to existing styles, ensure PrimaryButton size props are working if you define them in PrimaryButton.vue) */
.menu-management-page {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.menu-card {
  max-width: 800px;
  width: 100%;
}

.add-dish-btn {
  margin-bottom: 20px;
}

.dish-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.dish-item {
  background-color: var(--color-background-light);
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  padding: 15px;
  align-items: center;
}

.dish-info {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-grow: 1;
  text-align: left;
}

.dish-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid var(--color-border-light);
}

.dish-info h4 {
  margin: 0;
  color: var(--color-text-dark);
}

.dish-description {
  margin: 0;
  font-size: 0.9em;
  color: var(--color-grey-text);
}

.dish-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dish-price {
  font-weight: bold;
  color: var(--color-primary-orange);
  font-size: 1.1em;
  white-space: nowrap;
}
</style>