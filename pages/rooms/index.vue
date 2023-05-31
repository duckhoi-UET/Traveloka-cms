<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="font-semibold text-prim-100 text-2xl capitalize">
        Quản lý phòng
      </div>
      <a-button type="primary" ghost @click="addRoom"> Thêm mới </a-button>
    </div>
    <RoomTable
      class="mt-4"
      :loading="loading"
      :users="users"
      :pagination="pagination"
    />
    <div
      class="mt-4 flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-4"
    >
      <div class="text-gray-80 italic">
        Hiển thị {{ users.length }} trong tổng số
        {{ pagination.recordsTotal }} mục
      </div>
      <ct-pagination :data="pagination" />
    </div>
    <UserDialog ref="userDialog" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserDialog from "@/components/rooms/Dialog.vue";
import RoomTable from "@/components/rooms/Table.vue";

export default {
  components: {
    UserDialog,
    RoomTable,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState("users", ["users", "pagination"]),
  },

  methods: {
    addRoom() {
      this.$router.push("/rooms/add");
    },
  },

  head() {
    return {
      title: "Quản lý phòng",
    };
  },
};
</script>

