<template>
  <label v-if="label">{{ label }}</label>
  <input
    type="range"
    min=-1
    :max=options.length
    step="1"
    v-bind="$attrs"
    @change="$emit('update:modelValue', value)"
  />
</template>

<script>


export default {
  props: {
    options: {
            type: Array,
            required: true
        },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number], //accepts string or number values
      default: "",
    },
    value: {
      type: [Number]
    }
  },
};
</script>
