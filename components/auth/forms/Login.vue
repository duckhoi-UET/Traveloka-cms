<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        class="login-form space-y-4"
    >
        <a-form-model-item prop="username">
            <a-input
                v-model="form.username"
                size="large"
                placeholder="Tên đăng nhập"
                @keyup.native.enter="handleSubmit"
            >
                <template #prefix>
                    <i class="far fa-user text-prim-90" />
                </template>
            </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
            <a-input-password
                v-model="form.password"
                size="large"
                placeholder="Mật khẩu"
                @keyup.native.enter="handleSubmit"
            >
                <template #prefix>
                    <i class="fas fa-unlock-alt text-prim-90" />
                </template>
            </a-input-password>
        </a-form-model-item>
        <a-button
            :loading="loading"
            type="primary"
            size="large"
            class="w-full"
            @click="handleSubmit"
        >
            Đăng nhập
        </a-button>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';

    const defaultForm = {
        username: '',
        password: '',
    };

    export default {
        props: {
            loading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                form: _cloneDeep(defaultForm),
                rules: {
                    username: [
                        { required: true, message: 'Vui lòng nhập tên đăng nhập', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                    ],
                },
            };
        },

        methods: {
            handleSubmit() {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>

<style lang="scss">
    .login-form {
        .ant-input::placeholder {
            @apply text-center;
        }
    }
</style>
