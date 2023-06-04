<template>
  <div>
    <PageHeader title="Đặt phòng" back="/booking" isShowButtonBack />
    <div>
      <BookingForm />
    </div>
  </div>
</template>

<script>
import BookingForm from "@/components/booking/Form.vue";
import PageHeader from "@/components/common/PageHeader";
import { mapActions } from "vuex";

export default {
  components: {
    BookingForm,
    PageHeader,
  },

  created() {
    this.getListRoomSelect();
  },

  methods: {
    ...mapActions(["getListRoomSelect"]),
  },

  head() {
    return {
      title: "Đặt phòng",
    };
  },
};
</script>

