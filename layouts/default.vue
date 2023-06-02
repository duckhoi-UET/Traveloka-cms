<template>
  <a-layout
    id="components-layout-demo-custom-trigger"
    class="h-screen flex flex-col"
  >
    <Sidebar class="hidden md:block" :collapsed="collapsed" />

    <a-layout>
      <Header
        :collapsed="collapsed"
        :isMobile="isMobile"
        @collapseSidebar="collapseSidebar"
      ></Header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
        class="overflow-y-auto overflow-x-hidden"
      >
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Sidebar from "../components/layout/TheSidebar.vue";
import Header from "../components/layout/TheHeader.vue";
export default {
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      collapsed: false,
      isMobile: window.innerWidth <= 960,
    };
  },
  created() {
    if (localStorage.getItem("collapsed")) {
      this.collapsed = JSON.parse(localStorage.getItem("collapsed"));
    }
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  methods: {
    collapseSidebar() {
      this.collapsed = !this.collapsed;
      localStorage.setItem("collapsed", JSON.stringify(this.collapsed));
    },
    onResize() {
      if (window.innerWidth <= 960) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
  },
  beforeDestroy() {
    localStorage.removeItem("collapsed");
    window.removeEventListener("resize", this.onResize);
  },
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>

