<template>
  <a-form-model
    ref="form"
    :model="form"
    :rules="rules"
    layout="vertical"
    :colon="false"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <a-form-model-item label="Tên phòng" prop="fullName">
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
    </div>
  </a-form-model>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import _map from "lodash/map";

const defaultForm = {
  userName: "",
  password: "",
  fullName: "",
  phone: "",
  email: "",
  groups: [],
};

export default {
  data() {
    return {
      form: _cloneDeep(defaultForm),
      rules: {
        fullName: [
          { required: true, message: "Vui lòng nhập tên", trigger: "change" },
        ],
      },
    };
  },

  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.form);
        }
      });
    },
  },
};
</script>
