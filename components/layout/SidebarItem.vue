<template>
  <div>
    <div class="flex justify-between items-center pt-4 px-4">
      <nuxt-link to="/">
        <img src="/images/logo-2.png" width="150" />
      </nuxt-link>
    </div>
    <a-menu
      theme="dark"
      :open-keys="openKeys"
      :default-selected-keys="activeKeys"
      class="!mt-6"
      mode="inline"
      @click="handleClick"
      @openChange="handleOpenChange"
    >
      <template v-for="sidebarItem in SIDEBAR_ITEMS">
        <a-menu-item v-if="!sidebarItem.childs.length" :key="sidebarItem.route">
          <i class="mr-2" :class="sidebarItem.icon" />
          <span v-if="!collapsed || isMobile" class="truncate">
            {{ sidebarItem.label }}
          </span>
        </a-menu-item>

        <a-sub-menu v-if="sidebarItem.childs.length" :key="sidebarItem.route">
          <template slot="title">
            <i class="mr-2" :class="sidebarItem.icon" />
            <span v-if="!collapsed || isMobile" class="truncate">{{
              sidebarItem.label
            }}</span>
          </template>
          <template v-for="sidebarItemChild in sidebarItem.childs">
            <a-menu-item
              v-if="sidebarItemChild.route"
              :key="sidebarItemChild.route"
            >
              <span class="truncate">{{ sidebarItemChild.label }}</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import SIDEBAR_ITEMS from "@/constants/sidebarItems";
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      SIDEBAR_ITEMS,
      isOpen: true,
      openKeys: [],
      logoutVisible: false,
    };
  },
  computed: {
    activeKeys() {
      return [this.$route.path];
    },
  },

  methods: {
    handleClick({ key }) {
      this.$router.push(key);
      this.$emit("closeMenu");
    },

    handleOpenChange(keys) {
      this.openKeys = keys?.length ? [keys?.pop()] : [];
    },
  },
};
</script>

<style></style>
