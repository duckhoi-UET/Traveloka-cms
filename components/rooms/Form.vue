<template>
  <a-form-model
    ref="form"
    :model="form"
    :rules="rules"
    layout="vertical"
    :colon="false"
  >
    <a-form-model-item label="Tên phòng" prop="name">
      <a-input v-model="form.name" placeholder="Tên phòng" />
    </a-form-model-item>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
      <a-form-model-item label="Giá phòng" prop="price">
        <a-input v-model="form.price" placeholder="Giá phòng" />
      </a-form-model-item>
      <a-form-model-item label="Giảm giá" prop="discount">
        <a-input v-model="form.discount" placeholder="Giảm giá" />
      </a-form-model-item>
      <a-form-model-item label="Số người" prop="persons">
        <a-input v-model="form.persons" placeholder="Số người" />
      </a-form-model-item>
      <a-form-model-item label="Trạng thái" prop="ststus">
        <a-select v-model="form.status">
          <a-select-option
            v-for="(item, index) in ROOM_STATUS_OPTIONS"
            :key="index"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </div>
    <a-form-model-item label="Hình ảnh">
      <div v-if="fileList.length" class="flex gap-4 mb-4">
        <div
          class="img-card w-40 h-40 rounded overflow-hidden relative"
          v-for="(image, index) in fileList"
          :key="index"
        >
          <img
            class="w-full h-full object-cover"
            v-if="image.previewImage"
            :src="image.previewImage"
            alt="avatar"
          />
          <div
            class="img-action w-full h-full gap-2 absolute hidden top-0 left-0"
          >
            <a-icon type="eye" class="text-white hover:text-red-100 text-2xl" />
            <a-icon
              type="rest"
              class="text-white hover:text-red-100 text-2xl"
            />
          </div>
        </div>
      </div>
      <a-upload
        v-if="fileList.length < 4"
        list-type="picture-card"
        :show-upload-list="false"
        @change="handleChange"
      >
        <div>
          <a-icon class="text-2xl" :type="isLoading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">
            {{ isLoading ? "Đang tải lên..." : "Tải ảnh" }}
          </div>
        </div>
        <a-icon />
      </a-upload>
    </a-form-model-item>
    <a-form-model-item label="Nội dung">
      <Editor />
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import _map from "lodash/map";
import { ROOM_STATUS_OPTIONS } from "@/constants/rooms";
import Editor from "@/components/common/Editor";
import generate from "../../mixins/generate";
import { mapActions } from "vuex";

const defaultForm = {
  name: "",
  price: "",
  discount: "",
  persons: "",
  status: 1,
  groups: [],
};

export default {
  mixins: [generate],
  components: {
    Editor,
  },
  data() {
    return {
      ROOM_STATUS_OPTIONS,
      form: _cloneDeep(defaultForm),
      rules: {
        fullName: [
          { required: true, message: "Vui lòng nhập tên", trigger: "change" },
        ],
      },
      previewVisible: false,
      previewImage: "",
      fileList: [],
      isLoading: false,
    };
  },

  methods: {
    ...mapActions(["uploadImage"]),
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("submit", this.form);
        }
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await this.getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    async handleChange({ file }) {
      if (this.isLoading) return;
      if (file.status === "done") {
        try {
          this.isLoading = true;
          const preview = window.URL.createObjectURL(file.originFileObj);
          const formData = new FormData();
          formData.append("file", file.originFileObj);
          const response = await this.uploadImage(formData);
          delete file.response;
          const image = {
            ...file,
            source: response.data.fileUrl,
            previewImage: preview,
          };
          this.fileList.push(image);
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.img-card {
  &:hover {
    img {
      opacity: 0.8;
    }
    .img-action {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

