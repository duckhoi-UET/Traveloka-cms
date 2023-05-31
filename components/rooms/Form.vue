<template>
  <a-form-model
    ref="form"
    :model="form"
    :rules="rules"
    layout="vertical"
    :colon="false"
  >
    <a-form-model-item label="Hình ảnh">
      <a-upload
        :action="false"
        list-type="picture-card"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <div class="flex justify-center">
          <img
            alt="example"
            class="max-w-3xl max-h-[500px]"
            :src="previewImage"
          />
        </div>
      </a-modal>
    </a-form-model-item>
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
    handleChange({ fileList }) {
      console.log(fileList);
      this.fileList = fileList;
    },
  },
};
</script>
