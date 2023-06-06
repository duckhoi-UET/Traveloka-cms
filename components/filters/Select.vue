<template>
  <div>
    <div v-if="label" class="text-gray-80">
      {{ label }}
    </div>
    <a-select
      :value="data"
      class="w-full"
      :size="size"
      :placeholder="placeholder"
      :allow-clear="clearable"
      show-search
      :disabled="disabled"
      @change="onChange"
    >
      <a-select-option
        v-for="(item, index) in options"
        :key="index"
        :value="item.value"
      >
        {{ item.label }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import _assign from "lodash/assign";
import _omit from "lodash/omit";

export default {
  props: {
    label: String,
    options: {
      type: Array,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Tất cả",
    },
    size: {
      type: String,
      default: "default",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    selectDefault: {
      type: Boolean,
      default: false,
    },
    optionLabel: {
      type: String,
      default: "label",
    },
    optionValue: {
      type: String,
      default: "value",
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    data: {
      type: String,
      default: undefined,
    },
  },

  methods: {
    onChange(value) {
      this.$emit("update:data", value);
    },
  },
};
</script>

