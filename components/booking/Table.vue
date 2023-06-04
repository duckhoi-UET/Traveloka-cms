<template>
  <div>
    <a-table :data-source="booking" :loading="loading" :pagination="false">
      <a-table-column
        v-if="pagination"
        key="index"
        title="STT"
        :width="60"
        :custom-render="getIndex"
      />
      <a-table-column
        key="fullName"
        title="Họ Tên"
        :width="170"
        data-index="fullName"
        class="font-semibold"
      />
      <a-table-column
        key="identificationNumber"
        title="CCCD/CMND"
        data-index="identificationNumber"
        class="font-semibold"
        :width="120"
      />
      <a-table-column key="phone" title="SĐT" data-index="phone" :width="130">
        <template #default="phone">
          {{ phone | phoneFormat }}
        </template>
      </a-table-column>
      <a-table-column
        key="email"
        title="Email"
        data-index="email"
        :width="180"
      />
      <a-table-column key="createTime" title="Ngày Đặt" :width="200">
        <template #default="item">
          {{ dateFormat(item.bookFrom) }} - {{ dateFormat(item.bookTo) }}
        </template>
      </a-table-column>
      <a-table-column
        key="numberRoom"
        title="Số phòng"
        data-index="numberRoom"
        :width="100"
      >
      </a-table-column>
      <a-table-column key="status" title="Trạng Thái" :width="100">
        <template #default="booking">
          <a-tag :color="getStatus(booking.status).color">
            {{ getStatus(booking.status).label }}
          </a-tag>
        </template>
      </a-table-column>

      <a-table-column key="actions" align="right" :width="70">
        <template #default="booking">
          <a-dropdown :trigger="['click']">
            <div class="cursor-pointer hover:text-red-100">
              <i class="fas fa-ellipsis-h text-xl"></i>
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="0" @click="showDetail(booking._id)">
                <i class="fas fa-eye mr-2"></i>
                <span>Xem chi tiết</span>
              </a-menu-item>
              <a-menu-item key="1" v-if="booking.status == ROOM_STATUS.PENDING">
                <i class="fas fa-check-circle mr-2"></i>
                <span>Xác nhận</span>
              </a-menu-item>
              <a-menu-item
                key="1"
                v-if="booking.status != ROOM_STATUS.REJECTED"
              >
                <i class="fas fa-times-circle mr-2"></i>
                <span>Hủy bỏ</span>
              </a-menu-item>

              <a-menu-item key="3">
                <div class="text-red-100">
                  <i class="fas fa-trash mr-2"></i> Xóa
                </div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table-column>
    </a-table>
    <DetailDialog ref="detailDialog" />
  </div>
</template>

<script>
import { ROOM_STATUS_OPTIONS, ROOM_STATUS } from "@/constants/booking";
import DetailDialog from "./Dialog.vue";
import { mapActions } from "vuex";
import generate from "@/mixins/generate";

export default {
  mixins: [generate],
  props: {
    booking: {
      type: Array,
      required: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Object,
      required: false,
    },
  },
  components: {
    DetailDialog,
  },
  data() {
    return {
      ROOM_STATUS,
    };
  },

  methods: {
    ...mapActions("booking", ["getDetail"]),
    getIndex(text, record, index) {
      return (this.pagination.page - 1) * this.pagination.page_size + index + 1;
    },
    getStatus(status) {
      return ROOM_STATUS_OPTIONS.find((item) => item.value == status);
    },
    showDetail(id) {
      this.getDetail(id);
      this.$refs.detailDialog.open();
    },
  },
};
</script>
