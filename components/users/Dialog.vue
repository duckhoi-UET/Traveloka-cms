<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        :mask-closable="false"
        :title="`${user ? 'Chỉnh sửa' : 'Thêm mới'} người dùng`"
        width="650px"
    >
        <UserForm ref="userForm" :user="user" @submit="handleSubmit" />
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="$refs.userForm.submit()"
            >
                Thêm mới
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import UserForm from '@/components/users/Form.vue';

    const PASSWORD_NOT_CHANGED = 'PASSWORD_NOT_CHANGED';

    export default {
        components: {
            UserForm,
        },

        data() {
            return {
                visible: false,
                loading: false,
                user: null,
                encryptor: null,
            };
        },

        mounted() {
            const { JSEncrypt } = require('jsencrypt');
            this.encryptor = (message) => {
                const encrypt = new JSEncrypt();
                encrypt.setPublicKey(process.env.RSA_PUBLIC_KEY);

                return encrypt.encrypt(message);
            };
        },

        methods: {
            open(user) {
                this.user = user;
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async handleSubmit(form) {
                if (this.user) {
                    await this.updateUser(form);
                } else {
                    await this.createUser(form);
                }
                this.close();
                await this.$nuxt.refresh();
            },

            async createUser(form) {
                try {
                    this.loading = true;
                    await this.$api.users.create({
                        ...form,
                        password: this.encryptor(form.password),
                    });
                    this.close();
                    this.$message.success('Thêm người dùng thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },

            async updateUser(form) {
                try {
                    this.loading = true;
                    await this.$api.users.update(this.user.userId, {
                        ...form,
                        password: form.password ? this.encryptor(form.password) : PASSWORD_NOT_CHANGED,
                    });
                    this.close();
                    this.$message.success('Cập nhật thông tin người dùng thành công');
                } catch (error) {
                    this.$handleError(error);
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
