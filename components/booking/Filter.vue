<template>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 items-end"
    >
      <SearchFilter
        class="2xl:col-span-3"
        ref="searchFilter"
        label="Họ tên/ SĐT/ CMND/ Số phòng"
        placeholder="Họ tên/ SĐT/ CMND/ Số phòng"
      />

      <SelectFilter
        ref="selectFilter"
        query="status"
        label="Trạng thái"
        placeholder="Trạng thái"
        :options="BOOKING_STATUS_OPTIONS"
      />
      <DateRangeFilter ref="dateFilter" label="Ngày tạo" />
    </div>
    <div class="flex justify-end gap-4 mt-4">
      <a-button :loading="isLoading" @click="resetData"> Nhập lại </a-button>
      <a-button type="primary" :loading="isLoading" @click="handleFilterData">
        Tìm kiếm
      </a-button>
      <a-button type="primary" :loading="isLoading" ghost>
        <i class="far fa-file-excel mr-2" /> Xuất dữ liệu
      </a-button>
      <a-button type="primary" :loading="isLoading" ghost>
        <i class="fas fa-print mr-2" /> In danh sách
      </a-button>
    </div>
  </div>
</template>

<script>
import DateRangeFilter from "@/components/filters/DateRange.vue";
import SearchFilter from "@/components/filters/Search.vue";
import SelectFilter from "@/components/filters/Select.vue";
import SelectRemoteFilter from "@/components/filters/SelectRemote.vue";
import { BOOKING_STATUS_OPTIONS } from "@/constants/booking";
import _cloneDeep from "lodash/cloneDeep";
import { mapState } from "vuex";

export default {
  components: {
    DateRangeFilter,
    SearchFilter,
    SelectFilter,
    SelectRemoteFilter,
  },
  data() {
    return {
      BOOKING_STATUS_OPTIONS,
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  methods: {
    onFilter(data) {
      this.$emit("onFilter", data);
    },
    resetData() {
      this.$router.push({
        query: {},
      });
      this.$emit("resetData");
    },
    handleFilterData() {
      this.$emit("onFilter", this.$route.query);
    },
  },
};
</script>
