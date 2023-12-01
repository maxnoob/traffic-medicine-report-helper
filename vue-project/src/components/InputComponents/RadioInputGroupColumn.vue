<!-- Creates group of radio buttons (multiple RadioInputElements) -->
<!-- Created according to course on vuemastery.com/courses/vue3-forms/ -->
<!-- ":is" defines, what encaupsulating <component> is set to -->
<!-- horizontal class is only applied if (!vertical) evaluates to true -->
<!-- maybe set modelValue required to false -->

<template>
  <div class="radio-group">

    <component
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span'"
    :class="{
      horizontal: !vertical,
    }"
  >
  <RadioInputElementColumn 
  :label="option.label"
  :value="option.value"
  :modelValue="modelValue"
  :name="name"
  @update:modelValue="$emit('update:modelValue', $event)"
  @click.capture="deselect(option.value)"
  />
</component>
</div>
</template>

<script>
import RadioInputElementColumn from "./RadioInputElementColumn.vue";

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
  },
  components: { RadioInputElementColumn },
  methods: {
    // checks if the chosen value is the same as the current value so button can be deselected
    deselect(new_value) {
      console.log(this.modelValue + " | " + new_value);
      if (this.modelValue === new_value) {
        this.$emit("update:modelValue", "");
      }
    },
  },
};
</script>

<style scoped>
.horizontal {
  margin-right: 20px;
}
.vertical {
  margin-bottom: 20px; /* Adjust the bottom margin to increase the gap */
}

.radio-group {
  display: flex;
  gap: 20px;
}
.def-element{
  width: 200px;
}

label {
  margin-right: 5vw;
}

</style>
