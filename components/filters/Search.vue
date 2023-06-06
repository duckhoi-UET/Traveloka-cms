<template>
  <div>
    <div v-if="label" class="text-gray-80">
      {{ label }}
    </div>
    <a-input
      :value="keySearch"
      :placeholder="placeholder"
      class="search-filter"
      :size="size"
      :allow-clear="clearable"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,

    placeholder: {
      type: String,
      default: "Tìm kiếm",
    },
    size: {
      type: String,
      default: "default",
    },

    clearable: {
      type: Boolean,
      default: true,
    },
    keySearch: {
      type: String,
      default: "",
    },
  },

  methods: {
    onChange(e) {
      this.$emit("update:keySearch", e.target.value);
    },
  },
};
</script>

