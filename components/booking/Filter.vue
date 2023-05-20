<template>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 items-end"
    >
      <SearchFilter
        query="fullName"
        label="Họ tên/ SĐT"
        placeholder="Họ tên/ SĐT"
      />
      <SearchFilter
        query="billNo"
        label="Số hóa đơn"
        placeholder="Số hóa đơn"
      />
      <SearchFilter query="roomId" label="Số phòng" placeholder="Số phòng" />

      <SelectFilter
        query="status"
        label="Trạng thái"
        placeholder="Trạng thái"
        :options="status"
      />
      <DateRangeFilter
        ref="dateFilter"
        label="Ngày tạo"
        query="created"
        :allow-clear="false"
        customHandler
        @onChange="onFilter"
      />
    </div>
    <div class="flex justify-end gap-4 mt-4">
      <a-button @click="resetData"> Nhập lại </a-button>
      <a-button type="primary"> Tìm kiếm </a-button>
      <a-button type="primary" ghost>
        <i class="far fa-file-excel mr-2" /> Xuất dữ liệu
      </a-button>
      <a-button type="primary" ghost>
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

export default {
  components: {
    DateRangeFilter,
    SearchFilter,
    SelectFilter,
    SelectRemoteFilter,
  },
  data() {
    return {
      status: [
        {
          value: "SUCCESS",
          label: "Đã kích hoạt",
        },
        {
          value: "PENDING",
          label: "Chờ xác nhận",
        },
      ],
    };
  },
  methods: {
    onFilter(data) {
      this.$emit("onFilter", data);
    },
    resetData() {
      this.$refs.dateFilter.clear();
      this.$emit("resetData");
    },
  },
};
</script>
