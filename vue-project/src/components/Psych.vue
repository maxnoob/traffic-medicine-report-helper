<template>
  <FormCard>
    <h4 class="py-2">Psychische Störungen</h4>

    <div class="py-2" style="display: flex; align-items: center;">
      <label class="def-label">psychisch auffällig:</label>
      <RadioInputGroupColumn
        v-model="psych.condition"
        name="condition"
        :options="nein_jaOptions"
      />
    </div>

    <!-- Additional text field displayed when "Auffällig" is selected -->
    <div v-if="psych.condition === 'ja'" class="py-2">
      <label for="additionalInfo">weitere Angaben:</label>
      <input
        type="text"
        id="additionalInfo"
        v-model="psych.info"
      />
    </div>
  </FormCard>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroupColumn from "./InputComponents/RadioInputGroupColumn.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";
import FormCard from "./FormCard.vue";

const psych = ref({
  condition: null,
  info: '',
});
const nein_jaOptions = [
  { label: "nein", value: "nein" },
  { label: "ja", value: "ja" },
];

onMounted(() => persistToLocalStorage(psych, "psych"));

watch(
  psych,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("psych", JSON.stringify(psych.value));
  },
  { deep: true },
  { immediate: true }
);
</script>

<style>
 .def-label {
  width: 200px;
}
</style>
