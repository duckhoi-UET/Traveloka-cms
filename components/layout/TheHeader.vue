<template>
  <div
    class="py-4 px-4 md:px-6 flex justify-between items-center"
    :class="
      isShowHeader
        ? 'bg-white border-b border-gray-5 shadow-sm'
        : 'bg-transparent border-none'
    "
  >
    <div>
      <div class="md:hidden cursor-pointer" @click="toggleSidebar">
        <i class="fas fa-bars text-lg" />
      </div>
      <div
        class="hidden lg:block font-semibold text-xl"
        :class="isShowHeader ? 'text-prim-100' : 'text-white drop-shadow-lg'"
      >
        Hệ thống quản trị khách sạn
      </div>
    </div>
    <div class="flex items-center gap-6">
      <a href="tel:024 35 683727" class="font-semibold">
        <i
          class="fas fa-phone-alt"
          :class="isShowHeader ? 'text-gray-100' : 'text-white drop-shadow-lg'"
        />
        <span
          class="hidden md:inline"
          :class="isShowHeader ? 'text-red-100' : 'text-white drop-shadow-lg'"
          >024 35 683727</span
        >
      </a>
      <div
        class="font-semibold"
        :class="{ 'text-white drop-shadow-lg': !isShowHeader }"
      >
        <i class="fas fa-question-circle" />
        <span class="hidden md:inline">Trợ giúp</span>
      </div>
      <div
        :class="isShowHeader ? 'text-warning-100' : 'text-white drop-shadow-lg'"
      >
        <i class="fas fa-bell text-lg" />
      </div>
      <div class="flex items-center gap-2">
        <a-avatar>
          <i class="fas fa-user" />
        </a-avatar>
        <a-dropdown :trigger="['click']">
          <div
            class="cursor-pointer font-semibold"
            :class="
              isShowHeader ? 'text-gray-100' : 'text-white drop-shadow-lg'
            "
          >
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
      <TheSidebar class="h-full" />
    </a-drawer>
    <UpdateInfoDialog ref="updateInfoDialog" />
    <UpdatePasswordDialog ref="updatePasswordDialog" />
  </div>
</template>

<script>
import TheSidebar from "@/components/layout/TheSidebar.vue";
import NotificationPopover from "@/components/notifications/Popover.vue";
import UpdateInfoDialog from "@/components/auth/dialogs/UpdateInfo.vue";
import UpdatePasswordDialog from "@/components/auth/dialogs/UpdatePassword.vue";

export default {
  components: {
    TheSidebar,
    NotificationPopover,
    UpdateInfoDialog,
    UpdatePasswordDialog,
  },

  data() {
    return {
      sidebarVisible: false,
      isShowHeader: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
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
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    },

    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
    handleScroll(event) {
      if (window.scrollY > 500) {
        this.isShowHeader = true;
      } else {
        this.isShowHeader = false;
      }
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
</style>

