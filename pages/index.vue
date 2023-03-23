<template>
  <div class="mt-[516px]">
    <div class="flex gap-6">
      <div class="flex gap-4 border-r border-r-gray-40 pr-3">
        <img src="/images/icon/1.png" class="object-contain" alt="" />
        <div>
          <h3 class="text-xl text-blue-60 mb-0">Đảm bảo giá tốt nhất</h3>
          <span class="text-blue-60"
            >Chúng tôi đảm bảo khách hàng sẽ đặt được dịch vụ với giá tốt nhất,
            những chương trình khuyến mãi hấp dẫn nhất</span
          >
        </div>
      </div>
      <div class="flex gap-4 border-r border-r-gray-40 pr-3">
        <img src="/images/icon/2.png" class="object-contain" alt="" />
        <div>
          <h3 class="text-xl text-blue-60 mb-0">
            Dịch vụ tin cậy - Giá trị đích thực
          </h3>
          <span class="text-blue-60"
            >Đặt lợi ích khách hàng lên trên hết, chúng tôi hỗ trợ khách hàng
            nhanh và chính xác nhất với dịch vụ tin cậy, giá trị đích
            thực.</span
          >
        </div>
      </div>
      <div class="flex gap-4">
        <img src="/images/icon/3.png" class="object-contain" alt="" />
        <div>
          <h3 class="text-xl text-blue-60 mb-0">Đảm bảo chất lượng</h3>
          <span class="text-blue-60"
            >Chúng tôi liên kết chặt chẽ với các đối tác, khảo sát định kỳ để
            đảm bảo chất lượng tốt nhất của dịch vụ</span
          >
        </div>
      </div>
    </div>

    <FavoriteTour></FavoriteTour>
  </div>
</template>

<script>
import Banner from "@/components/banner/Banner.vue";
import FavoriteTour from "@/components/favorite_tour";
export default {
  components: {
    Banner,
    FavoriteTour,
  },
  auth: false,

  head() {
    return {
      title: "Hệ thống quản trị khách sạn",
    };
  },
};
</script>

