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
      <a-form-model-item label="Số điện thoại" prop="phone">
        <a-input v-model="form.phone" placeholder="Số điện thoại" />
      </a-form-model-item>
      <a-form-model-item label="Email" prop="email">
        <a-input v-model="form.email" placeholder="Email" />
      </a-form-model-item>
      <a-form-model-item label="Số CCCD/CMND" prop="identificationNumber">
        <a-input v-model="form.identificationNumber" placeholder="CCCD/CMND" />
      </a-form-model-item>
      <a-form-model-item label="Chọn phòng" prop="numberRoom">
        <a-select
          v-model="form.numberRoom"
          show-search
          allow-clear
          placeholder="Chọn phòng"
          option-filter-prop="children"
          :filter-option="filterOption"
        >
          <a-select-option
            v-for="room in listRoomSelect"
            :key="room._id"
            :value="room.number"
          >
            {{ room.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="Chọn ngày" prop="date">
        <a-range-picker
          class="w-full"
          v-model="form.date"
          :placeholder="['Từ ngày', 'Đến ngày']"
          format="DD/MM/YYYY"
          allow-clear
          @change="handleChooseDate"
        />
      </a-form-model-item>
      <a-form-model-item class="!mt-4">
        <a-button
          size="large"
          type="primary"
          :loading="isLoading"
          @click="onSubmit"
        >
          {{ !isEdit ? "Thêm mới" : "Chỉnh sửa" }}
        </a-button>
        <a-button size="large" style="margin-left: 10px" @click="handleCancel">
          Hủy bỏ
        </a-button>
      </a-form-model-item>
    </div>
  </a-form-model>
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import _map from "lodash/map";
import { phoneValidator } from "@/utils/form";
import { mapState, mapActions } from "vuex";

const defaultForm = {
  fullName: "",
  phone: "",
  email: "",
  identificationNumber: "",
  status: "1",
  numberRoom: undefined,
  date: "",
  bookFrom: "",
  bookTo: "",
};

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: _cloneDeep(defaultForm),
      rules: {
        fullName: [
          { required: true, message: "Vui lòng nhập tên", trigger: "change" },
        ],

        phone: [
          {
            required: true,
            validator: phoneValidator,
            trigger: "change",
          },
        ],
        email: [
          {
            type: "email",
            message: "Vui lòng nhập đúng định dạng email",
            trigger: "change",
          },
        ],
        identificationNumber: [
          {
            required: true,
            message: "Vui lòng nhập số CCCD/CMND",
            trigger: "change",
          },
        ],
        numberRoom: [
          {
            required: true,
            message: "Vui lòng chọn phòng",
            trigger: "change",
          },
        ],
        date: [
          {
            required: true,
            message: "Vui lòng chọn ngày",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["listRoomSelect", "isLoading"]),
  },

  methods: {
    ...mapActions("booking", ["createBooking"]),
    ...mapActions(["setLoading"]),
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          delete this.form.date;
          try {
            this.setLoading(true);
            const result = await this.createBooking(this.form);
            if (result) {
              if (!this.isEdit) {
                this.$message.success("Đã đặt phòng thành công");
              } else {
                this.$message.success("Đã chỉnh sửa thành công");
              }
              this.$router.push("/booking");
            }
          } catch (error) {
            if (!this.isEdit) {
              this.$message.success(
                "Đặt phòng không thành công, vui lòng thử lại"
              );
            } else {
              this.$message.success(
                "Chỉnh sửa phòng không thành công, vui lòng thử lại"
              );
            }
          } finally {
            this.setLoading(false);
          }
        }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleCancel() {
      this.$router.push("/booking");
    },
    handleChooseDate(dates, dateString) {
      this.form.bookFrom = dates[0]._d;
      this.form.bookTo = dates[1]._d;
    },
  },
};
</script>

