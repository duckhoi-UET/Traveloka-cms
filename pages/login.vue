<template>
    <div class="flex flex-col items-center">
        <a-alert
            v-if="error"
            class="!mt-3 w-full"
            :message="error"
            type="warning"
            show-icon
        />
        <LoginForm :loading="loading" class="!mt-3 min-w-[200px] max-w-md w-full" @submit="login" />
    </div>
</template>

<script>
    import LoginForm from '@/components/auth/forms/Login.vue';

    export default {
        layout: 'auth',

        components: {
            LoginForm,
        },

        data() {
            return {
                encryptor: null,
                loading: false,
                error: null,
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
            login(form) {
                this.loading = true;
                this.$auth.loginWith('local', {
                    data: {
                        ...form,
                        password: this.encryptor(form.password),
                    },
                }).then(async () => {
                    this.$router.push('/');
                }).catch((error) => {
                    this.$handleError(error, (_error) => {
                        const errorData = _error?.response?.data;

                        if (errorData?.code === 401) {
                            this.error = 'Tên đăng nhập hoặc mật khẩu không chính xác';
                            this.$forceUpdate();
                        }
                    });
                }).finally(() => {
                    this.loading = false;
                });
            },
        },

        head() {
            return {
                title: 'Đăng nhập | Nuxt Boilerplate',
            };
        },
    };
</script>
