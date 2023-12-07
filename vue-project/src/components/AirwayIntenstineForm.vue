<template>
  <form @submit.prevent class="shadow p-3 mb-5 bg-white rounded px-4">
    <!-- without @submit.prevent the page will reload after every button clicked-->

    <h4 class="py-2">Atem- und Bauchorganerkrankungen</h4>

    <RadioInputGroup
    v-model="airway_intestine.breathingsound"
    name="breathing"
    label="Atemgeräusche"
    :options="breathinsoundOptions"
    />

    <div v-if="airway_intestine.breathingsound == 'auffaellig'">
      <Input type="text" v-model="airway_intestine.sound_description" />
    </div>

    <RadioInputGroup
      v-model="airway_intestine.problem"
      name="problem"
      :options="nichtvorhanden_vorhandenOptions"
    />

    <div v-if="airway_intestine.problem == 'vorhanden'">
      <Input type="text" v-model="airway_intestine.description" />
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";

const nichtvorhanden_vorhandenOptions = [
  { label: "nicht vorhanden", value: "nichtvorhanden" },
  { label: "vorhanden", value: "vorhanden" },
];

const breathinsoundOptions = [
  {label:"normal über allen Lungenfeldern ohne Nebengeräusche", value:"normal"},
  {label:"auffällig", value:"auffaellig"}
]

const airway_intestine = ref({
  breathingsound: "",
  sound_description: "",
  problem: "nichtvorhanden",
  description: "",
});
/* populate fields with stored data */
onMounted(() => persistToLocalStorage(airway_intestine, "airway_intestine"));
/* use watch to retain inputted data via localStorage */
watch(
  airway_intestine,
  () => {
    console.log("watcher triggered");
    localStorage.setItem(
      "airway_intestine",
      JSON.stringify(airway_intestine.value)
    );
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
