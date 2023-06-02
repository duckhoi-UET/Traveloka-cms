<template>
  <a-page-header
    class="!mb-4"
    :title="title"
    :sub-title="subTitle"
    @back="handleBack"
  >
    <template #backIcon>
      <i v-if="isShowButtonBack" class="fas fa-arrow-left"></i>
    </template>
    <template v-if="isShowButtonRight" slot="extra">
      <a-button size="large" type="primary" ghost @click="handleClickButton">
        {{ button }}
      </a-button>
    </template>
  </a-page-header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    back: {
      type: String,
      require: true,
      default: "",
    },
    isShowButtonBack: {
      type: Boolean,
      default: false,
    },
    isShowButtonRight: {
      type: Boolean,
      default: false,
    },
    button: {
      type: String,
      default: "",
    },
    linkButton: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleBack() {
      this.$router.push(this.back);
    },
    handleClickButton() {
      this.$router.push(this.linkButton);
    },
  },
};
</script>

<style lang="scss">
.ant-page-header-heading-title {
  @apply capitalize;
}
</style>

