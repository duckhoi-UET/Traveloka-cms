<template>
  <a-layout-header
    style="background: #fff; padding: 0"
    class="flex justify-between"
  >
    <a-icon
      class="trigger !hidden md:!block"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="collapseSidebar"
    />
    <div class="md:hidden ml-6 cursor-pointer" @click="toggleSidebar">
      <i class="fas fa-bars text-lg" />
    </div>

    <div class="flex mr-6 gap-6">
      <div class="flex items-center gap-6">
        <a href="tel:024 35 683727" class="font-semibold">
          <i class="fas fa-phone-alt text-gray-100" />
          <span class="hidden md:inline text-red-100">024 35 683727</span>
        </a>
        <div class="font-semibold">
          <i class="fas fa-question-circle" />
          <span class="hidden md:inline">Trợ giúp</span>
        </div>
        <div class="text-warning-100">
          <i class="fas fa-bell text-lg" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <a-avatar>
          <i class="fas fa-user" />
        </a-avatar>
        <a-dropdown :trigger="['click']">
          <div class="cursor-pointer font-semibold text-gray-100">
            Đức Khôi
            <i class="fas fa-chevron-down" />
          </div>
          <template #overlay>
            <a-menu class="!mt-3">
              <a-menu-item class="!py-2" @click="$refs.updateInfoDialog.open()">
                <i class="mr-4 fas fa-user" />Cập nhật thông tin
              </a-menu-item>
              <a-menu-item
                class="!py-2"
                @click="$refs.updatePasswordDialog.open()"
              >
                <i class="mr-4 fas fa-key" />Đổi mật khẩu
              </a-menu-item>
              <a-menu-item class="!py-2" @click="logout">
                <i class="mr-4 fas fa-sign-out-alt" />Đăng xuất
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <a-drawer
      class="header-sidebar-drawer"
      :visible="sidebarVisible"
      placement="left"
      @close="sidebarVisible = false"
    >
      <SidebarItem :collapsed="collapsed" />
    </a-drawer>
    <UpdateInfoDialog ref="updateInfoDialog" />
    <UpdatePasswordDialog ref="updatePasswordDialog" />
  </a-layout-header>
</template>

<script>
import SidebarItem from "@/components/layout/SidebarItem.vue";
import NotificationPopover from "@/components/notifications/Popover.vue";
import UpdateInfoDialog from "@/components/auth/dialogs/UpdateInfo.vue";
import UpdatePasswordDialog from "@/components/auth/dialogs/UpdatePassword.vue";

export default {
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    SidebarItem,
    NotificationPopover,
    UpdateInfoDialog,
    UpdatePasswordDialog,
  },

  data() {
    return {
      sidebarVisible: false,
    };
  },

  computed: {
    authUser() {
      return (
        this.$auth.user || {
          fullName: "Lorem Ipsum",
        }
      );
    },
  },

  methods: {
    collapseSidebar() {
      this.$emit("collapseSidebar");
    },
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.header-sidebar-drawer {
  .ant-drawer-body {
    @apply p-0 h-full #{!important};
  }
}
.ant-drawer-content-wrapper {
  .ant-drawer-content {
    @apply bg-[#001529] #{!important};
  }
}
</style>

