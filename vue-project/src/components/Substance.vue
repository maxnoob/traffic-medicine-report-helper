<template>
    <FormCard>
      
  
      <h4 class="py-2">Substanzen</h4>

  
  
      <div class="d-flex py-2">
          <label>Foeter aethylicus:</label>
          <RadioInputGroup
            v-model="substance.foeter"
            name="foeter"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label>Gesichtserythem:</label>
          <RadioInputGroup
            v-model="substance.faceerythem"
            name="faceerythem"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label>Spider naevi:</label>
          <RadioInputGroup
            v-model="substance.spidernaevi"
            name="spidernaevi"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label>Einstichstellen:</label>
          <RadioInputGroup
            v-model="substance.puncture"
            name="puncture"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label>Ikterus:</label>
          <RadioInputGroup
            v-model="substance.icterus"
            name="icterus"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label>Palmarerythem:</label>
          <RadioInputGroup
            v-model="substance.palmarerythem"
            name="palmarerythem"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label>Nasenscheidewand:</label>
          <RadioInputGroup
            v-model="substance.septum"
            name="septum"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label>Narbenstrasse:</label>
          <RadioInputGroup
            v-model="substance.scar"
            name="scar"
            :options="nein_jaOptions"
          />
        </div>

    </FormCard>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from "vue";
  import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
  import persistToLocalStorage from "@/utils/persistToLocalStorage";
  import FormCard from "./FormCard.vue";
  


const substance = ref({
  foeter: null,
  faceerythem: null,
  spidernaevi: null,
  puncture: null,
  icterus: null,
  palmarerythem: null,
  septum: null,
  scar: null,
});
const nein_jaOptions = [
  { label: "nein", value: "nein" },
  { label: "ja", value: "ja" },
];

onMounted(
    () => persistToLocalStorage(substance, "substance")
    );

watch(
  substance,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("substance", JSON.stringify(substance.value));
  },
  { deep: true },
  { immediate: true }
);
</script>

  
