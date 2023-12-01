<template>
    <FormCard>
      
  
      <h4 class="py-2">Substanzen</h4>

  
  
      <div class="d-flex py-2 ">
          <label class="def-label">Foeter aethylicus:</label>
          <RadioInputGroupColumn
            v-model="substance.foeter"
            name="foeter"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label class="def-label">Gesichtserythem:</label>
          <RadioInputGroupColumn
            v-model="substance.faceerythem"
            name="faceerythem"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label class="def-label">Spider naevi:</label>
          <RadioInputGroupColumn
            v-model="substance.spidernaevi"
            name="spidernaevi"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label class="def-label">Einstichstellen:</label>
          <RadioInputGroupColumn
            v-model="substance.puncture"
            name="puncture"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label class="def-label">Ikterus:</label>
          <RadioInputGroupColumn
            v-model="substance.icterus"
            name="icterus"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label class="def-label">Palmarerythem:</label>
          <RadioInputGroupColumn
            v-model="substance.palmarerythem"
            name="palmarerythem"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label class="def-label">Nasenscheidewand:</label>
          <RadioInputGroupColumn
            v-model="substance.septum"
            name="septum"
            :options="nein_jaOptions"
          />
        </div>
        <div class="d-flex py-2">
          <label class="def-label">Narbenstrasse:</label>
          <RadioInputGroupColumn
            v-model="substance.scar"
            name="scar"
            :options="nein_jaOptions"
          />
        </div>

    </FormCard>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from "vue";
  import RadioInputGroupColumn from "./InputComponents/RadioInputGroupColumn.vue";
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
<style>
 .def-label {
  width: 200px;
}

</style>

  
