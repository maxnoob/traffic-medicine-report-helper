<!-- Creates text input field -->
<!-- Created according to course on vuemastery.com/courses/vue3-forms/ -->

<template>
    <label v-if="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :value="modelValue"
      :placeholder="placeholder"
      :label="label"
      @input="$emit('update:modelValue', $event.target.value)"
      class="field"
    >
  </template>
  
  <script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      modelValue: {
        type: [String, Number],
        default: ''
      }
    }
  }
  </script>

  <!-- Use component like:

-->