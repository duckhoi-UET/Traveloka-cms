<template>
  <div>
    <PageHeader
      title="Quản lý phòng"
      isShowButtonRight
      button="Thêm mới"
      linkButton="/rooms/add"
    />
    <RoomTable
      class="mt-4"
      :loading="isLoading"
      :rooms="rooms"
      :pagination="pagination"
      @update="reloadData"
    />
    <div
      class="mt-4 flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center gap-4"
    >
      <div class="text-gray-80 italic">
        Hiển thị {{ rooms.length }} trong tổng số {{ pagination?.total }} mục
      </div>
      <ct-pagination :data="pagination" />
    </div>
    <UserDialog ref="userDialog" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UserDialog from "@/components/rooms/Dialog.vue";
import RoomTable from "@/components/rooms/Table.vue";
import PageHeader from "@/components/common/PageHeader";

export default {
  components: {
    UserDialog,
    RoomTable,
    PageHeader,
  },

  data() {
    return {
      rooms: [],
      pagination: null,
    };
  },

  watch: {
    "$route.query.page"(value) {
      this.getAllData({ page: value });
    },
  },

  computed: {
    ...mapState(["isLoading"]),
  },
  created() {
    this.getAllData({ page: this.$route.query?.page });
  },

  methods: {
    ...mapActions("rooms", ["getAllRooms"]),
    ...mapActions(["setLoading"]),
    addRoom() {
      this.$router.push("/rooms/add");
    },
    reloadData() {
      this.getAllData({ page: this.$route.query?.page });
    },
    async getAllData(params) {
      try {
        this.setLoading(true);
        const response = await this.getAllRooms(params);
        if (response) {
          this.rooms = response.data.rooms;
          this.pagination = response.data.pagination;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoading(false);
      }
    },
  },

  head() {
    return {
      title: "Quản lý phòng",
    };
  },
};
</script>

