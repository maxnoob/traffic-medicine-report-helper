<template>
  <FormCard>
    <h4 class="py-2">Stoffwechselerkrankungen</h4>

    <div>
      <RadioInputGroup
        v-model="metabo.devices"
        name="metaboDevices"
        :options="metabo_devicesOptions"
        label="Devices für Stoffwechselerkrankungen"
      />
    </div>

    <div v-if="metabo.devices == 'vorhanden'" class="d-inline-flex">
      <div>
        <CheckboxInput v-model="metabo.cgm" :value="false" label="CGM" />
        <CheckboxInput v-model="metabo.pmg" :value="false" label="PMG" />
        <CheckboxInput v-model="metabo.pumpe" :value="false" label="Pumpe" />
      </div>
    </div>
</FormCard>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
import CheckboxInput from "./InputComponents/CheckboxInput.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage.js";
import FormCard from "./FormCard.vue";

const metabo_devicesOptions = [
  { label: "nicht vorhanden", value: "nichtvorhanden" },
  { label: "vorhanden", value: "vorhanden" },
];

const metabo = ref({
  devices: "",
  cgm: false,
  pmg: false,
  pumpe: false,
});
/* populate fields with stored data */
onMounted(
  () => persistToLocalStorage(metabo,"metabo")
);
/* use watch to retain inputted data via localStorage */
watch(
  metabo,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("metabo", JSON.stringify(metabo.value));
  },
  { deep: true },
  { immediate: true }
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="text"] {
  width: 80px;
}

label {
  margin-left: 6px;
}
</style>
