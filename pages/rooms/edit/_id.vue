<template>
  <div>
    <PageHeader title="Chỉnh sửa phòng" back="/rooms" isShowButtonBack />
    <div>
      <RoomForm isEdit />
    </div>
  </div>
</template>

<script>
import RoomForm from "@/components/rooms/Form.vue";
import PageHeader from "@/components/common/PageHeader";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    RoomForm,
    PageHeader,
  },

  computed: {
    ...mapState(["isLoading"]),
  },
  created() {
    this.getDetailRoom(this.$route.params.id);
  },

  methods: {
    ...mapActions("rooms", ["getDetailRoom"]),
  },

  head() {
    return {
      title: "Chỉnh sửa phòng",
    };
  },
};
</script>

