<!-- Creates group of radio buttons (multiple RadioInputElements) -->
<!-- Created according to course on vuemastery.com/courses/vue3-forms/ -->
<!-- ":is" defines, what encaupsulating <component> is set to -->
<!-- horizontal class is only applied if (!vertical) evaluates to true -->
<!-- maybe set modelValue required to false -->

<template>
  <label v-if="label" for="{{ name }} ">{{ label }}</label>
  <component
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span'"
    :class="{
      horizontal: !vertical,
    }"
  >
    <RadioInputElement
      :label="option.label"
      :value="option.value"
      :modelValue="modelValue"
      :name="name"
      @update:modelValue="$emit('update:modelValue', $event)"
      @click.capture="deselect(option.value)"
    />
  </component>
</template>

<script>
import RadioInputElement from "./RadioInputElement.vue";

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
  components: { RadioInputElement },
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
label {
  margin-right: 5vw;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}

.one {
  grid-column: 1;
}

.two {
  grid-column: 2;
}
</style>

<!--   Use in parent component like:
    ! set prop "vertical", so that radio button align vertical (vertical === :vertical="true")
  <div>
    <BaseRadioGroup
      v-model="event.someEvent"
      vertical
      name="someName"
      :options="someOptions"
    />
  </div>
    data () {
      return {
        someOptions: [
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 }
        ]
      }
    } -->
