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
    <div class="mt-4">
      <FilterTable @onFilter="onFilter" @resetData="resetData" />
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
      <!-- <ct-pagination :data="pagination" /> -->
    </div>
    <UserDialog ref="userDialog" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserDialog from "@/components/users/Dialog.vue";
import BookingTable from "@/components/booking/Table.vue";
import FilterTable from "@/components/booking/Filter.vue";
import generate from "@/mixins/generate";

export default {
  mixins: [generate],
  components: {
    UserDialog,
    BookingTable,
    FilterTable,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState("booking", ["booking", "pagination"]),
  },
  mounted() {
    this.generateData();
  },

  methods: {
    ...mapActions("booking", ["setBooking", "filter"]),
    generateData() {
      let data = [];
      for (let i = 0; i < 60; i++) {
        let item = {
          fullName: this.generateFullName(),
          numberCard: this.generateRandomNumberCard(),
          phone: this.generatePhoneNumber(),
          email: this.generateEmail(),
          status: "SUCCESS",
          roomKey: this.generateRoom(),
          createTime: this.generateDate(),
        };
        data.push(item);
      }
      this.setBooking(data);
    },
    onFilter(data) {
      this.filter(data);
    },
    resetData() {
      this.filter(null);
    },
  },

  head() {
    return {
      title: "Danh sách đặt phòng",
    };
  },
};
</script>

