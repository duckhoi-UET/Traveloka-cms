<template>
  <a-layout-sider
    :width="'256px'"
    v-model="collapsed"
    :trigger="null"
    collapsible
  >
    <SidebarItem :collapsed="collapsed" />
  </a-layout-sider>
</template>

<script>
import SidebarItem from "./SidebarItem.vue";
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    SidebarItem,
  },
};
</script>

