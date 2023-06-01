<template>
  <div>
    <a-table :data-source="rooms" :loading="loading" :pagination="false">
      <a-table-column
        v-if="pagination"
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
        data-index="price"
        class="font-semibold"
        :width="130"
      />
      <a-table-column key="discount" title="Giảm giá" :width="150">
        <template #default="room"> {{ room.discount }}% </template>
      </a-table-column>
      <a-table-column
        key="image"
        title="Hình ảnh"
        data-index="image"
        :width="220"
      />
      <a-table-column
        key="persons"
        title="Số người"
        data-index="persons"
        :width="180"
      >
      </a-table-column>
      <a-table-column key="status" title="Trạng thái" :width="120">
        <template #default="user">
          <a-switch :checked="!!user.status.id" @change="toggleStatus(user)" />
        </template>
      </a-table-column>
      <a-table-column key="actions" align="right" :width="80">
        <template #default="_user">
          <button @click="openUserDialog(_user)">
            <i class="text-gray-80 fas fa-pen" />
          </button>
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
    rooms: {
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
      return (
        (parseInt(+this.pagination.start + 1, 10) - 1) *
          this.pagination.length +
        index +
        1
      );
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
