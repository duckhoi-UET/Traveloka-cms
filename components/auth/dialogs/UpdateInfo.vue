<template>
    <a-modal
        v-model="visible"
        destroy-on-close
        title="Cập nhật thông tin cá nhân"
    >
        <a-form-model
            ref="form"
            :model="form"
            :rules="rules"
            layout="vertical"
            :colon="false"
        >
            <a-form-model-item label="Họ và tên" prop="fullName">
                <a-input v-model="form.fullName" placeholder="Nhập nội dung" />
            </a-form-model-item>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <a-form-model-item label="Email" prop="email">
                    <a-input v-model="form.email" placeholder="Nhập nội dung" />
                </a-form-model-item>
                <a-form-model-item label="Số điện thoại" prop="mobile">
                    <a-input v-model="form.mobile" placeholder="Nhập nội dung" />
                </a-form-model-item>
            </div>
        </a-form-model>
        <div slot="footer" class="flex justify-center items-center gap-2">
            <a-button class="w-28" @click="close">
                Hủy bỏ
            </a-button>
            <a-button
                :loading="loading"
                class="w-28"
                type="primary"
                @click="updateProfile"
            >
                Cập nhật
            </a-button>
        </div>
    </a-modal>
</template>

<script>
    import { phoneValidator } from '@/utils/form';

    export default {
        data() {
            return {
                visible: false,
                loading: false,
                room: null,
                form: {},
                rules: {
                    fullName: [{
                        required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur',
                    }],
                    mobile: [{
                        validator: phoneValidator, trigger: 'blur',
                    }],
                    email: [{
                        type: 'email', message: 'Vui lòng nhập đúng định dạng email', trigger: 'blur',
                    }],
                },
            };
        },

        computed: {
            authUser() {
                return this.$auth.user;
            },
        },

        methods: {
            open() {
                this.form = {
                    fullName: this.authUser.fullName,
                    email: this.authUser.email,
                    mobile: this.authUser.mobile,
                };
                this.visible = true;
            },

            close() {
                this.visible = false;
            },

            async updateProfile() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        try {
                            this.loading = true;
                            await this.$api.auth.updateProfile(this.form);
                            this.$message.success('Cập nhật thông tin cá nhân thành công');
                            this.close();
                            this.$auth.fetchUser();
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
