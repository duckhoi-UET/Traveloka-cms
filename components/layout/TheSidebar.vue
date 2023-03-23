/* eslint-disable vue/no-v-model-argument */
<template>
    <div class="!w-[260px] bg-[#031634] a-the-sidebar-vertical max-h-screen h-full flex flex-col">
        <div class="flex justify-between items-center pt-4 px-4">
            <nuxt-link to="/">
                <img src="/images/logo-3.png" width="150">
            </nuxt-link>
        </div>
        <a-menu
            :open-keys="openKeys"
            :default-selected-keys="activeKeys"
            :inline-collapsed="collapsed"
            class="!mt-6 w-[260px] flex-grow overflow-y-auto custom-scroll overflow-x-hidden !p-4"
            mode="inline"
            @click="handleClick"
            @openChange="handleOpenChange"
        >
            <a-sub-menu v-for="sidebarItem in SIDEBAR_ITEMS" :key="sidebarItem.route">
                <template slot="title">
                    <i :class="sidebarItem.icon" />
                    <span class="truncate">{{ sidebarItem.label }}</span>
                </template>
                <template v-for="sidebarItemChild in sidebarItem.childs">
                    <a-menu-item v-if="sidebarItemChild.route" :key="sidebarItemChild.route">
                        <span class="truncate">{{ sidebarItemChild.label }}</span>
                    </a-menu-item>
                </template>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script>
    import SIDEBAR_ITEMS from '@/constants/sidebarItems';

    export default {
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
            this.collapsed = localStorage.getItem('collapsed') || false;
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
        .ant-menu-item, .ant-menu-submenu-title {
            height: auto !important;
            @apply text-white flex items-center;
            @apply m-0 px-4 my-2 rounded  #{!important};

            >span {
                @apply flex-grow;
            }

            i {
                @apply text-lg w-4 mr-4 mb-1 #{!important};
            }

            .ant-menu-submenu-arrow {
                @apply mr-0;
                &::after, &::before {
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
