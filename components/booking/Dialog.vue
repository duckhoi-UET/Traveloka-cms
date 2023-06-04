<template>
  <a-modal
    v-model="visible"
    destroy-on-close
    :mask-closable="false"
    :title="'Thông tin đặt phòng'"
    width="650px"
  >
    <div v-if="isLoading" class="flex items-center justify-center">
      <a-spin tip="Loading..."> </a-spin>
    </div>
    <div v-else-if="detailBooking">
      <div class="grid grid-cols-4 gap-y-4">
        <div class="title">Họ và tên:</div>
        <div class="col-span-3">
          {{ detailBooking.fullName }}
        </div>
        <div class="title">Số điện thoại:</div>
        <div class="col-span-3">
          {{ detailBooking.phone }}
        </div>
        <div class="title">Email:</div>
        <div class="col-span-3">
          {{ detailBooking.email }}
        </div>
        <div class="title">Số CCCD/CMND:</div>
        <div class="col-span-3">
          {{ detailBooking.identificationNumber }}
        </div>
        <div class="title">Số phòng:</div>
        <div class="col-span-3">
          {{ detailBooking.numberRoom }}
        </div>
        <div class="title">Thời gian đặt:</div>
        <div class="col-span-3">
          {{ dateFormat(detailBooking.bookFrom) }} -
          {{ dateFormat(detailBooking.bookTo) }}
        </div>
        <div class="title">Ngày tạo:</div>
        <div class="col-span-3">
          {{ dateFormat(detailBooking.createdAt) }}
        </div>
        <div class="title">Trạng thái:</div>
        <div class="col-span-3">
          <a-tag :color="getStatus(detailBooking.status)?.color">
            {{ getStatus(detailBooking.status)?.label }}
          </a-tag>
        </div>
      </div>
    </div>
    <div slot="footer" class="flex justify-center items-center gap-2">
      <a-button class="w-28" @click="close"> Đóng </a-button>
    </div>
  </a-modal>
</template>

<script>
import { mapState } from "vuex";
import generate from "@/mixins/generate";
import { ROOM_STATUS_OPTIONS } from "@/constants/booking";
export default {
  mixins: [generate],
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("booking", ["detailBooking"]),
  },

  methods: {
    open() {
      this.visible = true;
    },

    close() {
      this.visible = false;
    },
    getStatus(status) {
      return ROOM_STATUS_OPTIONS.find((item) => item.value == status);
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  @apply font-bold;
}
</style>
