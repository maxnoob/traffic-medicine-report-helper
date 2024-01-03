<!-- Creates radio button element -->
<!-- Created according to course on vuemastery.com -->
<!-- $emit is needed, so that parent component recieves the change-event and the value of the radio button -->
<!-- $attrs allows for attribute injection into the element in the parent -->
<!-- class="form-check-input" is bootstrap styling -->

<template>
  <input
    type="radio"
    :checked="modelValue === value"
    :value="value"
    v-bind="$attrs"
    @change="$emit('update:modelValue', value)"
    class="form-check-input"
  />
  <label v-if="label">{{ label }}</label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number], //accepts string or number values
      default: "",
    },
    value: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style scoped>
label{
    margin-left: 6px;
}
</style>

<!-- Apply this component in parent like:
<div>
    <RadioInputElement
      v-model="event.someevent"
      :value="1"
      label="Yes"
      name="justsomename"
    />
  </div>

<div>
    <RadioInputElement
      v-model="event.someevent"
      :value="0"
      label="No"
      name="justsomename"
    />
  </div>
-->
