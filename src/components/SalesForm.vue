<script setup lang="ts">
import { ref } from 'vue';
import { useSalesStore } from '../stores/salesStore';

const salesStore = useSalesStore();

const name = ref('');
const company = ref('');
const sales = ref(0);
const date = ref('');

const submitSale = async () => {
  await salesStore.addSale({
    name: name.value,
    company: company.value,
    sales: sales.value,
    date: date.value,
  });

  // Reset form
  name.value = '';
  company.value = '';
  sales.value = 0;
  date.value = '';
};
</script>

<template>
  <form @submit.prevent="submitSale" class="space-y-4 p-4 bg-white rounded-lg shadow">
    <div>
      <label class="block text-sm font-medium text-gray-700">Product Name</label>
      <input
        v-model="name"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Company</label>
      <input
        v-model="company"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Sales Amount</label>
      <input
        v-model="sales"
        type="number"
        required
        min="0"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Date</label>
      <input
        v-model="date"
        type="date"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Add Sale
    </button>
  </form>
</template>