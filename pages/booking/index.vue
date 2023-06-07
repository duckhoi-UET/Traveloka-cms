<template>
  <div>
    <PageHeader
      title="Danh sách đặt phòng"
      isShowButtonRight
      button="Thêm mới"
      linkButton="/booking/add"
    />
    <div class="mt-4">
      <FilterTable @onFilter="onFilter" @resetData="resetData" />
    </div>
    <BookingTable
      class="mt-4"
      :loading="isLoading"
      :booking="booking"
      :pagination="pagination"
      @update="reloadData"
    />
    <div
      class="mt-4 flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-4"
    >
      <div class="text-gray-80 italic">
        Hiển thị {{ booking.length }} trong tổng số {{ pagination?.total }} mục
      </div>
      <ct-pagination :data="pagination" @change="handleChangePagination" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BookingTable from "@/components/booking/Table.vue";
import FilterTable from "@/components/booking/Filter.vue";
import generate from "@/mixins/generate";
import PageHeader from "@/components/common/PageHeader";

export default {
  mixins: [generate],
  components: {
    BookingTable,
    FilterTable,
    PageHeader,
  },

  data() {
    return {
      booking: [],
      pagination: null,
    };
  },

  // watch: {
  //   "$route.query"(value) {
  //     this.getAllData(value);
  //   },
  // },

  computed: {
    ...mapState(["isLoading"]),
  },
  created() {
    this.getAllData(this.$route.query);
  },

  methods: {
    ...mapActions("booking", ["getAll"]),
    ...mapActions(["setLoading"]),
    async getAllData(params) {
      try {
        this.setLoading(true);
        const response = await this.getAll(params);
        if (response) {
          this.booking = response.data.booking;
          this.pagination = response.data.pagination;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoading(false);
      }
    },
    onFilter(data) {
      this.getAllData(data);
    },
    resetData() {
      this.getAllData();
    },
    reloadData() {
      this.getAllData(this.$route.query);
    },
    handleChangePagination(page) {
      this.getAllData({ ...this.$route.query, page: page });
    },
  },

  head() {
    return {
      title: "Danh sách đặt phòng",
    };
  },
};
</script>

