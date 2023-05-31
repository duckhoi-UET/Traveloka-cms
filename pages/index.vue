<template>
  <div>
    <div class="font-semibold text-prim-100 text-2xl capitalize">Trang chủ</div>
    <LineChart />
  </div>
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue";
export default {
  components: {
    LineChart,
  },

  head() {
    return {
      title: "Hệ thống quản trị khách sạn",
    };
  },
};
</script>

