<template>
      <FormCard>
    <h4 class="py-2">Atem- und Bauchorganerkrankungen</h4>

    <label>Diagnosen:</label>
    <RadioInputGroup
      v-model="airway_intestine.problem"
      name="problem"
      :options="nichtvorhanden_vorhandenOptions"
    />

    <div v-if="airway_intestine.problem == 'vorhanden'" class="py-2">
        <label for="additionalInfo">weitere Angaben:</label>
        <Input type="text" 
          placeholder="bekannte Diagnosen"
          id="additionalInfo"
          v-model="airway_intestine.description" />
    </div>
    
</FormCard>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";
import FormCard from "./FormCard.vue";

const nichtvorhanden_vorhandenOptions = [
  { label: "nicht vorhanden", value: "nichtvorhanden" },
  { label: "vorhanden", value: "vorhanden" },
];

const airway_intestine = ref({
  problem: "",
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


label {
  margin-left: 6px;
}
</style>
