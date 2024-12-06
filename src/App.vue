<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SalesChart from './components/SalesChart.vue';
import SalesForm from './components/SalesForm.vue';
import SalesEditForm from './components/SalesEditForm.vue';
import { useSalesStore } from './stores/salesStore';

const salesStore = useSalesStore();

const selectedSale = ref(null);
const showEditForm = ref(false);

onMounted(async () => {
  await salesStore.fetchSales();
});

const handleEditSale = (sale) => {
  selectedSale.value = sale;
  showEditForm.value = true;
};

const handleCloseEdit = () => {
  selectedSale.value = null;
  showEditForm.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4">
        <h1 class="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Sales Form -->
        <div class="lg:col-span-1">
          <SalesForm />
        </div>

        <!-- Sales Chart -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <SalesChart :onEdit="handleEditSale" />
        </div>

        <!-- Edit Form Modal -->
        <div v-if="showEditForm" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 class="text-xl font-bold mb-4">Edit Sale</h2>
            <SalesEditForm
              v-if="selectedSale"
              :sale="selectedSale"
              :onClose="handleCloseEdit"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>