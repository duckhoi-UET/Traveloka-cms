<template>
  <div>
    <PageHeader title="Thêm Mới Phòng" back="/rooms" isShowButtonBack />
    <div>
      <RoomForm />
    </div>
  </div>
</template>

<script>
import RoomForm from "@/components/rooms/Form.vue";
import PageHeader from "@/components/common/PageHeader";

export default {
  components: {
    RoomForm,
    PageHeader,
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {},

  head() {
    return {
      title: "Thêm mới phòng",
    };
  },
};
</script>

