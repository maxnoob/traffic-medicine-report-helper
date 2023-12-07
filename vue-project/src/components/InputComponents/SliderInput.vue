<!--TODO make functioning slider component!--> 
<template>
  <label v-if="label">{{ label }}</label>
  <input
    type="range"
    min=0
    :max=options.length
    step="1"
    v-bind="$attrs"
    @change="$emit('update:modelValue', value)"
    @click.capture="deselect(option.value)"
    @input="changeOutput()"
          />
          <span>{{ conv_output }}</span>
  />
</template>

<script>

/* const gangOptions = ["nicht geprüft", "sicher", "leicht schwankend", "stark schwankend", "unmöglich"];

const romberg_conv = ref("nicht geprüft");
function romberg_change() {
  romberg_conv.value = gangOptions[neuro.value.romberg_test];
}
 */
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
