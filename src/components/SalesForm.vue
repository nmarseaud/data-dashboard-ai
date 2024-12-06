<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSalesStore } from '../stores/salesStore';

const salesStore = useSalesStore();

const companies = ref<string[]>([]);
const productNames = ref<string[]>([]);

onMounted(() => {
  companies.value = Array.from(salesStore.salesByCompany.keys());
  productNames.value = Array.from(salesStore.salesByProduct.keys());
  console.log(companies.value);
  console.log(productNames.value);
});

const name = ref('');
const company = ref('');
const sales = ref(0);
const date = ref('');

const resetForm = () => {
  name.value = '';
  company.value = '';
  sales.value = 0;
  date.value = '';
};

const submitSale = async () => {
  await salesStore.addSale({
    name: name.value,
    company: company.value,
    sales: sales.value,
    date: date.value,
  });
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
        list="product-names"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <datalist id="product-names">
        <option v-for="product in productNames" :key="product" :value="product" />
      </datalist>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Company</label>
      <input
        v-model="company"
        type="text"
        required
        list="company-names"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <datalist id="company-names">
        <option v-for="company in companies" :key="company" :value="company" />
      </datalist>
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

    <div class="flex gap-4">
      <button
        type="submit"
        class="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Sale
      </button>
      <button
        type="button"
        @click="resetForm"
        class="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Reset
      </button>
    </div>
  </form>
</template>