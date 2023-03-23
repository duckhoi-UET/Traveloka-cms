<template>
  <div class="swiper h-[600px] w-full">
    <swiper :options="swiperOptions" class="h-[600px] w-full">
      <swiper-slide>
        <img src="/images/banner/banner_1.png" class="w-full" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="/images/banner/banner_2.png" class="w-full" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="/images/banner/banner_3.jpg" class="w-full" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,

        // autoplay: {
        //   delay: 5000,
        //   disableOnInteraction: false,
        // },
      },
    };
  },
};
</script>

