<template>
    <FormCard>
      
  
      <h4 class="py-2">Substanzen</h4>

  
  
      <div class="d-flex py-2 " style="background-color: aliceblue;">
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
        <div class="d-flex py-2 " style="background-color: aliceblue;">
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
        <div class="d-flex py-2 " style="background-color: aliceblue;">
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
        <div class="d-flex py-2 " style="background-color: aliceblue;">
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
<br>
<div>
        <div>
          <h6 class="py-2" style="background-color: aliceblue">Lebergrösse</h6>
          <label class="liver-label">tastbar unter Rippenbogen</label>
        <RadioInputGroupColumn
        v-model="substance.liver_touch"
        name="liver"
        :options="nein_jaOptions"
        />
      </div>
  </div>
  <div class="grid-container">
      <div class="grid-item">
        <label>in MCL:</label>

        <input
          class="value_input"
          type="text"
          placeholder="cm"
          v-model="substance.liver_size"
        />
      </div>    
 

      <div class="grid-item">
        <br>
        <RadioInputGroupColumn
        v-model="substance.liver_sound"
        name="liver_sound"
        :options="perk_auskOptions"
        />
      </div>
  
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
const perk_auskOptions = [
  { label: "perkutorisch", value: "perkutorisch" },
  { label : "kratzauskulatorisch", value: "kratzauskulatorisch" },
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
<style scoped>
 .def-label {
  width: 200px;
}
.liver-label {
  width: 250px;
}
.value_input {
  width: 60px;
  height: 40px;
  border-style: solid;
  border-width: 0.1cap;
  border-radius: 5px;
  border-color: lightgray;
}
.mcl-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.mcl-row .col {
  flex-grow: 0;
}
.grid-container {
  display: grid;
  grid-template-columns: 10rem 35rem;
}

.grid-item {
  background-color: none;
  text-align: start;
  border: black;
}
.v-al-label{
width: 200px;
}
</style>

  
