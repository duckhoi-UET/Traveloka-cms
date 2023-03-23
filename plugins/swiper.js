import Vue from 'vue';
import {
    Swiper as SwiperClass,
    Controller,
    Zoom,
    Pagination,
    Mousewheel,
    Autoplay,
    Navigation,
    Lazy,
    Thumbs,
} from 'swiper/core';

import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css';

SwiperClass.use([
    Controller,
    Zoom,
    Pagination,
    Mousewheel,
    Autoplay,
    Navigation,
    Lazy,
    Thumbs,
]);
Vue.use(getAwesomeSwiper(SwiperClass));
