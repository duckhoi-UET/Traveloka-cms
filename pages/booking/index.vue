<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="font-semibold text-prim-100 text-2xl capitalize">
        Danh sách đặt phòng
      </div>
      <!-- <a-button type="primary" ghost @click="$refs.userDialog.open()">
        Thêm mới
      </a-button> -->
    </div>
    <BookingTable
      class="mt-4"
      :loading="loading"
      :booking="booking"
      :pagination="pagination"
    />
    <div
      class="mt-4 flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-4"
    >
      <div class="text-gray-80 italic">
        Hiển thị {{ booking.length }} trong tổng số
        {{ pagination.recordsTotal }} mục
      </div>
      <ct-pagination :data="pagination" />
    </div>
    <UserDialog ref="userDialog" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserDialog from "@/components/users/Dialog.vue";
import BookingTable from "@/components/booking/Table.vue";

export default {
  auth: false,

  components: {
    UserDialog,
    BookingTable,
  },

  async fetch() {
    // await this.fetchData();
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState("booking", ["booking", "pagination"]),
  },

  // async watchQuery(query) {
  //     await this.fetchData(query);
  // },

  methods: {
    async fetchData(query) {
      try {
        this.loading = true;
        await this.$store.dispatch("users/fetchAll", {
          query: query || this.$route.query,
        });
      } catch (error) {
        this.$handleError(error);
      } finally {
        this.loading = false;
      }
    },
  },

  head() {
    return {
      title: "Danh sách đặt phòng",
    };
  },
};
</script>

