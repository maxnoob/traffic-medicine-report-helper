<!-- Creates value input field -->
<!-- this component works with bootstrap v5.3; for future versions, component may need to be updated -->
<!-- Created according to course on vuemastery.com/courses/vue3-forms/ -->

<template>
  <label v-if="label">{{ label }}</label>
  <div class="input-group input-group-sm mb-3">
    <span v-if="deco_start" class="input-group-text">{{ deco_start }}</span>
    <input
      v-bind="$attrs"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :deco_end="deco_end"
      :deco_start="deco_start"
      :label="label"
      @input="$emit('update:modelValue', $event.target.value)"
      class="value_input"
    />
  </div>
  <span v-if="deco_end" class="input-group-text">{{ deco_end }}</span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.value_input {
  width: 100px;
  height: 40px;
  border-style: solid;
  border-width: 0.1cap;
  border-radius: 5px;
  border-color: lightgray;
}
</style>

<!-- Use component like:
<ValueInput
v-model=""
:placeholder="placeholder"
:deco_end="deco_end"
:deco_start="deco_start"
:label="label"
/>
-->