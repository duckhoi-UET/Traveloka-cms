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
            <a-menu slot="overlay" @click="onClickMenu($event, booking)">
              <a-menu-item :key="BOOKING_MENU_TABLE.DETAIL">
                <i class="fas fa-eye mr-2"></i>
                <span>Xem chi tiết</span>
              </a-menu-item>
              <a-menu-item
                :key="BOOKING_MENU_TABLE.ACCEPT"
                v-if="booking.status == BOOKING_STATUS.PENDING"
              >
                <i class="fas fa-check-circle mr-2"></i>
                <span>Xác nhận</span>
              </a-menu-item>
              <a-menu-item
                :key="BOOKING_MENU_TABLE.REJECT"
                v-if="booking.status != BOOKING_STATUS.REJECTED"
              >
                <i class="fas fa-times-circle mr-2"></i>
                <span>Hủy bỏ</span>
              </a-menu-item>

              <a-menu-item :key="BOOKING_MENU_TABLE.DELETE">
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
    <ct-confirm-dialog
      ref="confirmDialog"
      :title="dialog.title"
      :confirmBtnType="dialog.confirmBtnType"
      :content="dialog.content"
      :loading="isLoading"
      @confirm="confirm"
      @cancel="handleClosePopup"
    />
  </div>
</template>

<script>
import {
  BOOKING_STATUS_OPTIONS,
  BOOKING_STATUS,
  BOOKING_MENU_TABLE,
} from "@/constants/booking";
import DetailDialog from "./Dialog.vue";
import { mapActions, mapState } from "vuex";
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
      BOOKING_STATUS,
      BOOKING_MENU_TABLE,
      dialog: {},
      bookingItem: null,
      type: null,
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },

  methods: {
    ...mapActions("booking", ["getDetail", "deleteBooking", "updateBooking"]),
    ...mapActions(["setLoading"]),
    getIndex(text, record, index) {
      return (this.pagination.page - 1) * this.pagination.page_size + index + 1;
    },

    getStatus(status) {
      return BOOKING_STATUS_OPTIONS.find((item) => item.value == status);
    },
    onClickMenu({ key }, item) {
      switch (key) {
        case BOOKING_MENU_TABLE.DETAIL: {
          this.showDetail(item._id);
          break;
        }
        case BOOKING_MENU_TABLE.DELETE: {
          this.confirmDelete(item);
          break;
        }
        case BOOKING_MENU_TABLE.ACCEPT: {
          this.confirmEdit(item, BOOKING_MENU_TABLE.ACCEPT);
          break;
        }
        case BOOKING_MENU_TABLE.REJECT: {
          this.confirmEdit(item, BOOKING_MENU_TABLE.REJECT);
          break;
        }
      }
    },
    handleClosePopup() {
      this.bookingItem = null;
      this.type = null;
    },
    showDetail(id) {
      this.getDetail(id);
      this.$refs.detailDialog.open();
    },
    confirmDelete(item) {
      this.bookingItem = item;
      this.type = BOOKING_MENU_TABLE.DELETE;
      this.dialog = {
        title: "Xác nhận xóa",
        confirmBtnType: "danger",
        content: `Bạn có chắc chắn muốn xóa yêu cầu đặt phòng này không?`,
      };
      this.$refs.confirmDialog.open();
    },
    confirmEdit(item, type) {
      this.bookingItem = item;
      this.type = type;
      this.dialog = {
        title: type == BOOKING_MENU_TABLE.ACCEPT ? "Xác nhận " : "Xác nhận hủy",
        confirmBtnType: "danger",
        content:
          type == BOOKING_MENU_TABLE.ACCEPT
            ? "Bạn có chắc chắn muốn xác nhận yêu cầu đặt phòng này không?"
            : "Bạn có chắc chắn muốn hủy yêu cầu đặt phòng này không?",
      };
      this.$refs.confirmDialog.open();
    },
    async confirm() {
      try {
        this.setLoading(true);
        let result = undefined;
        switch (this.type) {
          case BOOKING_MENU_TABLE.DELETE: {
            result = await this.deleteBooking({ id: this.bookingItem._id });
            this.$message.success("Đã xóa thành công");
            break;
          }
          case BOOKING_MENU_TABLE.ACCEPT: {
            result = await this.updateBooking({
              id: this.bookingItem._id,
              data: { status: BOOKING_STATUS.ACCEPTED },
            });
            this.$message.success("Đã xác nhận yêu cầu đặt phòng thành công");
            break;
          }
          case BOOKING_MENU_TABLE.REJECT: {
            result = await this.updateBooking({
              id: this.bookingItem._id,
              data: { status: BOOKING_STATUS.REJECTED },
            });
            this.$message.success("Đã hủy yêu cầu đặt phòng thành công");
            break;
          }
        }

        if (result) {
          this.$emit("update");
          this.$refs.confirmDialog.close();
        }
      } catch (error) {
        this.$message.success("Lỗi hệ thống, vui lòng thử lại sau");
      } finally {
        this.setLoading(false);
      }
    },
  },
};
</script>

