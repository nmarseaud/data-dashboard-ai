<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSalesStore } from '../stores/salesStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const salesStore = useSalesStore();

const chartData = computed(() => {
  const companies = Array.from(salesStore.salesByCompany.keys());
  const datasets = companies.map(company => ({
    label: company,
    data: salesStore.salesByCompany.get(company)?.map(sale => sale.sales) || [],
    borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    fill: false
  }));

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
  }
};
</script>

<template>
  <div class="h-[400px] w-full">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>