<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="font-semibold text-prim-100 text-2xl capitalize">
        Thêm mới phòng
      </div>
    </div>
    <div>
      <RoomForm />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import RoomForm from "@/components/rooms/Form.vue";

export default {
  auth: false,

  components: {
    RoomForm,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState("users", ["users", "pagination"]),
  },

  methods: {},

  head() {
    return {
      title: "Quản lý phòng",
    };
  },
};
</script>

