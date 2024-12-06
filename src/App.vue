<script setup lang="ts">
import { onMounted } from 'vue';
import SalesChart from './components/SalesChart.vue';
import SalesForm from './components/SalesForm.vue';
import { useSalesStore } from './stores/salesStore';

const salesStore = useSalesStore();

onMounted(async () => {
  await salesStore.fetchSales();
});
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
          <SalesChart />
        </div>
      </div>
    </main>
  </div>
</template>