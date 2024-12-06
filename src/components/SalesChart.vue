<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSalesStore } from '../stores/salesStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const salesStore = useSalesStore();

const props = defineProps<{
  onEdit: (sale: any) => void;
}>();

const chartData = computed(() => {
  const companies = Array.from(salesStore.salesByCompany.keys());

  // Get all unique dates from all companies and sort them
  const allDates = new Set();
  salesStore.salesByCompany.forEach(sales => {
    sales.forEach(sale => allDates.add(sale.date));
  });
  const sortedDates = Array.from(allDates).sort();

  const datasets = companies.map(company => ({
    label: company,
    data: salesStore.salesByCompany.get(company)?.map(sale => sale.sales) || [],
    borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    fill: false
  }));

  return {
    labels: sortedDates,
    datasets
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sales by Company'
    }
  },
  onClick: (event: any, elements: any) => {
    console.log('clicked', elements);
    if (elements.length > 0) {
      const datasetIndex = elements[0].datasetIndex;
      const index = elements[0].index;

      const company = Array.from(salesStore.salesByCompany.keys())[datasetIndex];
      const sale = salesStore.salesByCompany.get(company)?.[index];

      if (sale) {
        props.onEdit(sale);
      }
    }
  }
};
</script>

<template>
  <div class="h-[400px] w-full">
    <Line :data="chartData" :options="chartOptions" />
    <p class="text-sm text-gray-500 mt-2 text-center">Click on any data point to edit</p>
  </div>
</template>