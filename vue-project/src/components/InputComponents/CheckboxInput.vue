<!-- Creates checkbox element -->
<!-- Created according to course on vuemastery.com -->
<!-- $emit is needed, so that parent component recieves the change-event and the value of the radio button -->
<!-- $attrs allows for attribute injection into the element in the parent -->

<template>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="field"
    />
    <label v-if="label">{{ label }}</label>
  </template>
  
  <script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      modelValue: {
        type: Boolean,
        default: false
      }
    }
  }
  </script>

<!-- Apply this component in parent like:
<div>
    <CheckboxInput
      v-model="event.someevent"
      :value="false"
      label="Yes"
      name="justsomename"
    />
  </div>
  -->