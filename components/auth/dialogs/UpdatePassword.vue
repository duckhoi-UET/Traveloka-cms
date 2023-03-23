<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        title="Đổi mật khẩu"
    >
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
            layout="vertical"
            :colon="false"
        >
            <a-form-model-item label="Mật khẩu hiện tại" prop="oldPassword">
                <a-input-password v-model="form.oldPassword" placeholder="Nhập mật khẩu hiện tại" />
            </a-form-model-item>
            <a-form-model-item label="Mật khẩu mới" prop="newPassword">
                <a-input-password v-model="form.newPassword" placeholder="Nhập mật khẩu mới" />
            </a-form-model-item>
            <a-form-model-item label="Nhập lại mật khẩu mới" prop="newPasswordConfirmation">
                <a-input-password v-model="form.newPasswordConfirmation" placeholder="Nhập lại mật khẩu mới" />
            </a-form-model-item>
        </a-form-model>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="updatePassword"
            >
                Cập nhật
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import { passwordValidtor } from '@/utils/form';

    export default {
        data() {
            const passwordConfirmValidator = async (_rule, value) => {
                if (value !== this.form.newPassword) {
                    // eslint-disable-next-line prefer-promise-reject-errors
                    return Promise.reject('Nhập lại mật khẩu không khớp với mật khẩu mới');
                }

                return Promise.resolve();
            };

            return {
                visible: false,
                loading: false,
                room: null,
                encryptor: null,
                form: {},
                rules: {
                    oldPassword: [{
                        required: true, message: 'Vui lòng nhập mật khẩu hiện tại', trigger: 'blur',
                    }],
                    newPassword: [{
                        required: true, message: 'Vui lòng nhập mật khẩu mới', trigger: 'blur',
                    }, {
                        validator: passwordValidtor, trigger: 'blur',
                    }],
                    newPasswordConfirmation: [{
                        validator: passwordConfirmValidator, triggler: 'blur',
                    }, {
                        required: true, message: 'Vui lòng nhập lại mật khẩu mới', trigger: 'blur',
                    }],
                },
            };
        },

        computed: {
            authUser() {
                return this.$auth.user;
            },
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
            open() {
                this.form = {
                    oldPassword: '',
                    newPassword: '',
                };
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async updatePassword() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            await this.$api.auth.updatePassword({
                                oldPassword: this.form.oldPassword,
                                newPassword: this.encryptor(this.form.newPassword),
                            });
                            this.$message.success('Cập nhật mật khẩu mới thành công');
                            this.close();
                            await this.$auth.logout();
                            this.$router.push('/login');
                        } catch (error) {
                            this.$handleError(error);
                        } finally {
                            this.loading = false;
                        }
                    }
                });
            },
        },
    };
</script>
