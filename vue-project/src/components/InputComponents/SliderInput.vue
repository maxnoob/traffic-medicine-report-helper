<template>
  <label  v-if="label">{{ label }}</label>
  <input
    type="range"
    min="0"
    :max="options.length - 1"
    step="1"
    v-bind="$attrs"
    :value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    @input="slider_change($event.target.value)"
    :style="style"
    
  />
  <span class="spacing" style="font-weight: 300;">{{ conv_value }}</span>
</template>

<script>
import { ref, watch } from "vue";
//  @click="deselect(modelValue)"
export default {
  props: {
    options: {
      type: Array,
      required: true,
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
      type: [Number],
    },
  },
  setup(props, { emit }) {
    const conv_value = ref("nicht geprüft"); // Initialize psr_conv using ref
    //const selectedValue = ref(null);

    watch(
      () => props.modelValue,
      (newValue) => {
        conv_value.value = props.options[newValue];
       // selectedValue.value = newValue;
      }
    );

    function slider_change(newValue) {
      conv_value.value = props.options[newValue];
      emit("update:modelValue", newValue); // Emit event to update modelValue
    }

    // checks if the chosen value is the same as the current value so button can be deselected
/*     function deselect(clickedValue) {
      console.log(selectedValue.value + " | " + clickedValue);
      if (selectedValue.value === clickedValue) {
        emit("update:modelValue", "");
      }
    } */

    return {
      conv_value,
      slider_change,
      //deselect,
    };
  },
};
</script>

<style scoped>
.spacing {
  padding-left: 0.5rem;
}

label{
  padding-right: 0.5rem;
}

</style>