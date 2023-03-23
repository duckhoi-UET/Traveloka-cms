<template>
  <swiper
    :options="swiperOption"
    class="media-slider flex items-center flex-col gap-6"
  >
    <slot name="slider"></slot>
    <div
      slot="button-prev"
      class="swiper-button-prev font-semibold after:text-gray-60 !after:w-10 after:h-16 text-5xl rounded-full z-999"
    />
    <div
      slot="button-next"
      class="swiper-button-next font-semibold text after:text-gray-60 after:w-10 after:h-16 rounded-full"
    />
  </swiper>
</template>

<script>
import _chunk from "lodash/chunk";

export default {
  props: {
    rows: {
      type: Number,
      default: 1,
    },
    interval: {
      type: Number,
      default: 5000,
    },
  },

  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        // autoplay: {
        //   delay: 3000,
        //   pauseOnMouseEnter: true,
        //   disableOnInteraction: false,
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
    };
  },
};
</script>

<style lang="scss">
.media-slider {
  .swiper-button-prev,
  .swiper-button-next {
    &::after {
      @apply text-sm;
    }
  }
  .image-category {
    img {
      @apply object-cover;
    }
  }
}
</style>

