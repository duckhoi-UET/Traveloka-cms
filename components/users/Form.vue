<template>
    <a-form-model
        ref="form"
        :model="form"
        :rules="rules"
        layout="vertical"
        :colon="false"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <a-form-model-item label="Tên" prop="fullName">
                <a-input v-model="form.fullName" placeholder="Tên" />
            </a-form-model-item>
            <a-form-model-item label="Username" prop="userName">
                <a-input v-model="form.userName" placeholder="Tên" />
            </a-form-model-item>
            <a-form-model-item label="Password" prop="password">
                <a-input-password v-model="form.password" placeholder="Password" />
            </a-form-model-item>
            <a-form-model-item label="Số điện thoại" prop="phone">
                <a-input v-model="form.phone" placeholder="Số điện thoại" />
            </a-form-model-item>
            <a-form-model-item label="Email" prop="email">
                <a-input v-model="form.email" placeholder="Email" />
            </a-form-model-item>
            <a-form-model-item label="Group" prop="groups">
                <SelectRemote
                    v-model="form.groups"
                    mode="multiple"
                    fetch-url="selections/fetchGroups"
                    option-label="description"
                    option-value="id"
                    store="selections"
                    store-prop="groups"
                    placeholder="Group"
                />
            </a-form-model-item>
        </div>
    </a-form-model>
</template>

<script>
    import _cloneDeep from 'lodash/cloneDeep';
    import _map from 'lodash/map';
    import { passwordValidtor, phoneValidator, usernameValidator } from '@/utils/form';
    import SelectRemote from '@/components/filters/SelectRemote.vue';

    const defaultForm = {
        userName: '',
        password: '',
        fullName: '',
        phone: '',
        email: '',
        groups: [],
    };

    export default {
        components: {
            SelectRemote,
        },

        props: {
            user: Object,
        },

        data() {
            return {
                form: this.user
                    ? _cloneDeep({ ...this.user, password: '', groups: _map(this.user.groups, 'id') })
                    : _cloneDeep(defaultForm),
                rules: {
                    fullName: [
                        { required: true, message: 'Vui lòng nhập tên', trigger: 'change' },
                    ],
                    userName: [
                        { required: true, message: 'Vui lòng nhập tên tài khoản', trigger: 'blur' },
                        { validator: usernameValidator, trigger: 'blur' },
                    ],
                    password: [
                        ...[!this.user ? { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'change' } : {}],
                        { validator: passwordValidtor, trigger: 'blur' },
                    ],
                    groups: [
                        { required: true, message: 'Vui lòng chọn group', trigger: 'blur' },
                    ],
                    phone: [
                        { validator: phoneValidator, trigger: 'blur' },
                    ],
                    email: [
                        { type: 'email', message: 'Vui lòng nhập đúng định dạng email', trigger: 'blur' },
                    ],
                },
            };
        },

        methods: {
            submit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$emit('submit', this.form);
                    }
                });
            },
        },
    };
</script>
