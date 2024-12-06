<script setup lang="ts">
import { ref } from 'vue';
import { useSalesStore } from '../stores/salesStore';

const props = defineProps<{
  sale: {
    id: number;
    company: string;
    date: string;
    sales: number;
  };
  onClose: () => void;
}>();

const salesStore = useSalesStore();
const editedSale = ref({
  company: props.sale.company,
  date: props.sale.date,
  sales: props.sale.sales,
});

const handleSubmit = async () => {
  await salesStore.updateSale({
    id: props.sale.id,
    ...editedSale.value
  });
  props.onClose();
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Company</label>
      <input
        type="text"
        v-model="editedSale.company"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Date</label>
      <input
        type="date"
        v-model="editedSale.date"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Sales Amount</label>
      <input
        type="number"
        v-model="editedSale.sales"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>

    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="onClose"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
      >
        Save Changes
      </button>
    </div>
  </form>
</template>