/* eslint-disable vue/no-v-model-argument */
<template>
  <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
    <div class="logo" />
    <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
      <a-menu-item key="1">
        <a-icon type="user" />
        <span>nav 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="video-camera" />
        <span>nav 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="upload" />
        <span>nav 3</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import SIDEBAR_ITEMS from "@/constants/sidebarItems";

export default {
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      SIDEBAR_ITEMS,
      isOpen: true,
      openKeys: [],
      logoutVisible: false,
      collapsed: false,
    };
  },

  computed: {
    activeKeys() {
      return [this.$route.path];
    },
  },

  async mounted() {
    this.collapsed = localStorage.getItem("collapsed") || false;
  },

  methods: {
    handleClick({ key }) {
      this.$router.push(key);
    },

    handleOpenChange(keys) {
      this.openKeys = keys?.length ? [keys?.pop()] : [];
    },

    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      localStorage.setItem(this.localStorage);
    },
  },
};
</script>

<style lang="scss">
.a-the-sidebar-vertical:not(.a-menu--collapse) {
  @apply w-[256px];
  .ant-menu {
    @apply bg-[#031634];
  }
  .ant-menu-inline {
    @apply border-0;
  }
  .ant-menu-sub {
    .ant-menu-item {
      @apply pl-8 #{!important};
    }
  }
  .ant-menu-submenu-arrow {
    @apply text-right;
  }
  .ant-menu-item,
  .ant-menu-submenu-title {
    height: auto !important;
    @apply text-white flex items-center;
    @apply m-0 px-4 my-2 rounded  #{!important};

    > span {
      @apply flex-grow;
    }

    i {
      @apply text-lg w-4 mr-4 mb-1 #{!important};
    }

    .ant-menu-submenu-arrow {
      @apply mr-0;
      &::after,
      &::before {
        @apply bg-white #{!important};
      }
    }

    &-selected {
      @apply bg-[#2ea1ff];
      &::after {
        @apply hidden;
      }
    }
  }
}
</style>

