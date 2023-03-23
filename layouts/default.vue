<template>
  <div class="min-h-screen flex flex-col">
    <Header class="sticky top-0 w-full z-40" />
    <Banner class="absolute top-0" />
    <div class="absolute z-50 top-1/4 left-1/2 -translate-x-1/2 text-center">
      <h1
        class="text-7xl outline-4 text-white shadow-2xl font-bold mb-1"
        style="font-family: roboto"
      >
        BẠN ĐANG MUỐN ĐI ĐÂU?
      </h1>
      <span
        class="outline-4 text-white shadow-2xl text-2xl"
        style="font-family: roboto"
        >Hãy để Cattour tư vấn cho bạn chuyến đi tuyệt vời nhất!</span
      >
    </div>

    <div
      class="container mx-auto max-w-[1200px] flex-grow my-4 xl:my-8 px-4 xl:px-0"
    >
      <nuxt v-if="!$slots.default" />
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/layout/TheHeader.vue";
import Footer from "@/components/layout/TheFooter.vue";
import Banner from "@/components/banner/Banner.vue";

export default {
  components: {
    Header,
    Footer,
    Banner,
  },
};
</script>

