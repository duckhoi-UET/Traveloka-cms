<template>
  <div class="mt-12">
    <div class="text-center mb-9">
      <h3 class="title-content">NHỮNG TOUR ĐƯỢC YÊU THÍCH</h3>
      <span class="title-sub-content">
        Các tour được đặt nhiều nhất trong tháng này
      </span>
    </div>
    <Slider>
      <template v-slot:slider>
        <swiper-slide v-for="(item, index) in tour" :key="index">
          <Tour :data="item"></Tour>
        </swiper-slide>
      </template>
    </Slider>
  </div>
</template>

<script>
import Slider from "@/components/common/Slider";
import Tour from "./components/Item.vue";
export default {
  components: {
    Slider,
    Tour,
  },
  data() {
    return {
      tour: [
        {
          title:
            "Tour du lịch Nhật Bản Mùa Hè | Hà Nội - Osaka - Kyoto - Nagoya - Phú Sỹ - Yokohama - Tokyo 6N5Đ",
          star: 5,
          price: "399,000",
          oldPrice: "450,000",
          image: "/images/Tour/1.jpg",
          views: 240,
        },
        {
          title:
            "Tour du lịch Nhật Bản Mùa Hè | Hà Nội - Osaka - Kyoto - Nagoya - Phú Sỹ - Yokohama - Tokyo 6N5Đ",
          star: 3,
          price: "399,000",
          oldPrice: "450,000",
          image: "/images/Tour/2.jpg",
          views: 23,
        },
        {
          title:
            "Tour du lịch Nhật Bản Mùa Hè | Hà Nội - Osaka - Kyoto - Nagoya - Phú Sỹ - Yokohama - Tokyo 6N5Đ",
          star: 4,
          price: "399,000",
          oldPrice: "450,000",
          image: "/images/Tour/3.jpg",
          views: 150,
        },
        {
          title:
            "Tour du lịch Nhật Bản Mùa Hè | Hà Nội - Osaka - Kyoto - Nagoya - Phú Sỹ - Yokohama - Tokyo 6N5Đ",
          star: 3,
          price: "399,000",
          oldPrice: "450,000",
          image: "/images/Tour/4.jpg",
          views: 35,
        },
        {
          title:
            "Tour du lịch Nhật Bản Mùa Hè | Hà Nội - Osaka - Kyoto - Nagoya - Phú Sỹ - Yokohama - Tokyo 6N5Đ",
          star: 1,
          price: "399,000",
          oldPrice: "450,000",
          image: "/images/Tour/5.jpg",
          views: 200,
        },
        {
          title:
            "Tour du lịch Nhật Bản Mùa Hè | Hà Nội - Osaka - Kyoto - Nagoya - Phú Sỹ - Yokohama - Tokyo 6N5Đ",
          star: 3,
          price: "399,000",
          oldPrice: "450,000",
          image: "/images/Tour/6.png",
          views: 46,
        },
      ],
    };
  },
};
</script>

<style></style>

