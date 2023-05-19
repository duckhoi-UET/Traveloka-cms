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
        key="numberCard"
        title="CCCD/CMND"
        data-index="numberCard"
        class="font-semibold"
        :width="120"
      />
      <a-table-column key="phone" title="SĐT" data-index="phone" :width="150">
        <template #default="phone">
          {{ phone | phoneFormat }}
        </template>
      </a-table-column>
      <a-table-column
        key="email"
        title="Email"
        data-index="email"
        :width="200"
      />
      <a-table-column
        key="createTime"
        title="Ngày Đặt"
        data-index="createTime"
        :width="150"
      >
      </a-table-column>
      <a-table-column
        key="roomKey"
        title="Số phòng"
        data-index="roomKey"
        :width="100"
      >
      </a-table-column>
      <a-table-column key="status" title="Trạng Thái" :width="110">
        <template #default="user">
          <a-tag :color="user.status === 'SUCCESS' ? 'green' : 'orange'">
            {{ user.status === "SUCCESS" ? "Đã xác nhận" : "Chờ xác nhận" }}
          </a-tag>
        </template>
      </a-table-column>

      <a-table-column key="actions" align="right" :width="80">
        <template #default="_user">
          <a-dropdown :trigger="['click']">
            <div class="cursor-pointer hover:text-red-100">
              <i class="fas fa-ellipsis-h text-xl"></i>
            </div>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <div>
                  <i class="fas fa-eye mr-2"></i>
                  <a :href="_user">Xem chi tiết</a>
                </div>
              </a-menu-item>
              <a-menu-item key="1">
                <div>
                  <i class="fas fa-phone mr-2"></i>
                  <a href="http://www.taobao.com/">Liên hệ</a>
                </div>
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
    <UserDialog ref="userDialog" />
  </div>
</template>

<script>
import _join from "lodash/join";
import _map from "lodash/map";
import UserDialog from "@/components/users/Dialog.vue";

export default {
  components: {
    UserDialog,
  },

  props: {
    booking: {
      type: Array,
      required: true,
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

  methods: {
    getIndex(text, record, index) {
      return index + 1;
    },

    getGroupName(groups) {
      return _join(_map(groups, "description"), ", ");
    },

    openUserDialog(user) {
      this.$refs.userDialog.open(user);
    },

    async toggleStatus(user) {
      try {
        await this.$api.users.toggleStatus(user.userId);
        await this.$nuxt.refresh();
        this.$message.success("Cập nhật trạng thái user thành công");
      } catch (error) {
        this.$handleError(error);
      }
    },
  },
};
</script>
