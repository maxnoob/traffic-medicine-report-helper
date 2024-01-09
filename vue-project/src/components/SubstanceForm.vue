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
            :options="septumOptions"
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
          <div class="threeCols">
          <label class="liver-label">tastbar unter Rippenbogen</label>
        <RadioInputGroup
        v-model="substance.liver_touch"
        name="liver"
        :options="nein_jaOptions"
        />
      </div>
      </div>
  </div>
  <div class="threeCols">
    <div class="twoCols">
        <label>in MCL:</label>
        <input
          class="value_input"
          type="text"
          placeholder="cm"
          v-model="substance.liver_size"
        />
      </div>
        <RadioInputGroup
        v-model="substance.liver_sound"
        name="liver_sound"
        :options="perk_auskOptions"
        />
</div>



    </FormCard>
  </template>
  
  <script setup>
  import { onMounted, ref, watch } from "vue";
  import RadioInputGroupColumn from "./InputComponents/RadioInputGroupColumn.vue";
  import persistToLocalStorage from "@/utils/persistToLocalStorage";
  import FormCard from "./FormCard.vue";
  import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
  
const substance = ref({
  foeter: null,
  faceerythem: null,
  spidernaevi: null,
  puncture: null,
  icterus: null,
  palmarerythem: null,
  septum: null,
  scar: null,
  mcl: ""
});
const nein_jaOptions = [
  { label: "nein", value: "nein" },
  { label: "ja", value: "ja" },
];
const perk_auskOptions = [
  { label: "perkutorisch", value: "perkutorisch" },
  { label : "kratzauskulatorisch", value: "kratzauskulatorisch" },
];
const septumOptions = [
{ label: "intakt", value: "intact" },
{ label: "defekt", value: "defect" }
]
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

.threeCols {
  display: grid;
  grid-template-columns: 14rem 10rem 12rem;
  gap: 0.5rem;
  padding: 1px;
  vertical-align:sub;
}
.twoCols {
  display: grid;
  grid-template-columns: 6rem 6rem;
  gap: 0.5rem;
  padding: 1px;
  vertical-align: middle;
}

label,
select, h6 {
  margin-left: 6px;
}

</style>

  
