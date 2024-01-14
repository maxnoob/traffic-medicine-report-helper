<template>
  <FormCard>
    <h4 class="py-2">Atem- und Bauchorganerkrankungen</h4>

    <RadioInputGroup
      v-model="airway_intestine.breathingsound"
      name="breathing"
      label="Atemgeräusche"
      :options="breathinsoundOptions"
    />

    <div v-if="airway_intestine.breathingsound == 'auffaellig'">
      <label for="additionalInfo">weitere Angaben:</label>
      <Input
        type="text"
        placeholder="bekannte Diagnosen"
        id="additionalInfo"
        v-model="airway_intestine.sound_description"
      />
    </div>
  </FormCard>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";
import FormCard from "./FormCard.vue";

const breathinsoundOptions = [
  {
    label: "normal über allen Lungenfeldern ohne Nebengeräusche",
    value: "normal",
  },
  { label: "auffällig", value: "auffaellig" },
];

const airway_intestine = ref({
  breathingsound: "",
  sound_description: "",
  problem: "nichtvorhanden",
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
