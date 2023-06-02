<template>
  <div>
    <a-table :data-source="rooms" :loading="loading" :pagination="false">
      <a-table-column
        key="index"
        title="STT"
        :width="60"
        :custom-render="getIndex"
      />
      <a-table-column
        key="name"
        title="Tên phòng"
        :width="200"
        data-index="name"
        class="font-semibold"
      />
      <a-table-column
        key="price"
        title="Giá"
        class="font-semibold"
        :width="180"
      >
        <template #default="room">
          {{ currencyFormat(room.price) }}
        </template>
      </a-table-column>
      <a-table-column key="discount" title="Giảm giá" :width="100">
        <template #default="room"> {{ room.discount }}% </template>
      </a-table-column>
      <a-table-column key="image" title="Hình ảnh" align="center" :width="220">
        <template #default="room">
          <div>
            <img
              class="shadow-md rounded-sm object-cover max-h-44 max-w-[200px] mx-auto"
              :src="room.images[0].source"
              alt=""
            />
          </div>
        </template>
      </a-table-column>
      <a-table-column
        key="persons"
        title="Số người"
        data-index="persons"
        align="center"
        :width="180"
      >
      </a-table-column>
      <a-table-column key="status" title="Trạng thái" :width="120">
        <template #default="room">
          <a-tag :color="room.status != ROOM_STATUS.READY ? 'red' : 'green'">
            {{ room.status != ROOM_STATUS.READY ? "Đã đặt" : "Còn phòng" }}
          </a-tag>
        </template>
      </a-table-column>
      <a-table-column key="actions" align="right" :width="80">
        <template #default="_room">
          <a-dropdown :trigger="['click']">
            <div class="cursor-pointer hover:text-red-100">
              <i class="fas fa-ellipsis-h text-xl"></i>
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="0" @click="handleToEditPage(_room._id)">
                <div>
                  <i class="fas fa-pen mr-2"></i>
                  <span>Chỉnh sửa</span>
                </div>
              </a-menu-item>
              <a-menu-item key="1" @click="handleToggleRoom(_room)">
                <i
                  class="fas mr-2"
                  :class="
                    _room.status != ROOM_STATUS.READY
                      ? 'fa-times-circle'
                      : 'fa-check-circle'
                  "
                ></i>
                <span>
                  {{
                    _room.status != ROOM_STATUS.READY
                      ? "Hủy phòng"
                      : "Đặt phòng"
                  }}
                </span>
              </a-menu-item>

              <a-menu-item key="3" @click="confirmDeleteRoom(_room._id)">
                <div class="text-red-100">
                  <i class="fas fa-trash mr-2"></i> Xóa
                </div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table-column>
    </a-table>
    <ct-confirm-dialog
      ref="confirmDialog"
      :title="dialog.title"
      :confirmBtnType="dialog.confirmBtnType"
      :content="dialog.content"
      :loading="isLoading"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import _join from "lodash/join";
import _map from "lodash/map";
import generate from "../../mixins/generate";
import { ROOM_STATUS } from "@/constants/rooms";
import { mapActions, mapState } from "vuex";

export default {
  mixins: [generate],

  props: {
    rooms: {
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
  data() {
    return {
      ROOM_STATUS,
      roomDelete: null,
      dialog: {},
    };
  },
  computed: {
    ...mapState(["isLoading"]),
  },

  methods: {
    ...mapActions("rooms", ["deleteRoom"]),
    ...mapActions(["setLoading"]),

    getIndex(text, record, index) {
      return (this.pagination.page - 1) * this.pagination.page_size + index + 1;
    },

    confirmDeleteRoom(id) {
      this.roomDelete = this.rooms.find((room) => room._id === id);
      this.dialog = {
        title: "Xác nhận xóa",
        confirmBtnType: "danger",
        content: `Bạn có chắc chắn muốn xóa phòng  <span class='font-bold'>${this.roomDelete?.name}</span>  không?`,
      };
      this.$refs.confirmDialog.open();
    },
    handleToggleRoom(room) {
      if (room.status == ROOM_STATUS.FULL) {
        this.dialog = {
          title: "Xác nhận hủy phòng",
          confirmBtnType: "danger",
          content: `Bạn có chắc chắn muốn huỷ phòng  <span class='font-bold'>${room.name}</span>  không?`,
        };
        this.$refs.confirmDialog.open();
      }
    },
    async handleDeleteRoom() {
      try {
        this.setLoading(true);
        const result = await this.deleteRoom({ id: this.roomDelete._id });
        if (result) {
          this.$emit("update");
          this.$message.success("Đã xóa phòng thành công");
          this.$refs.confirmDialog.close();
        }
      } catch (error) {
        this.$message.success(
          "Xóa phòng không thành công, vui lòng thử lại sau"
        );
      } finally {
        this.setLoading(false);
      }
    },
    handleToEditPage(id) {
      this.$router.push(`/rooms/edit/${id}`);
    },
  },
};
</script>

