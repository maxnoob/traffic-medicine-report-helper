<template>
  <FormCard>
    <h4 class="py-2">Wirbelsäule und Bewegungsapparat</h4>

    <div>
      <label
        >rasche Kopfdrehung 45° links/rechts und langsame Oberkörperdrehung 90°
        links/rechts:</label
      >
    </div>
    <div>
      <RadioInputGroupColumn
        v-model="mobility.spine_movement"
        name="spine_movement"
        :options="moeglich_nichtmoeglichOptions"
      />
    </div>

    <div v-if="mobility.spine_movement == 'nicht_moeglich'">
      <label for="additionalInfo">weitere Angaben:</label>
      <Input
        type="text"
        placeholder="weitere Angaben" v-model="mobility.description" />
    </div>
<div>
    <label>Extremitätenbeweglichkeit:</label>
    <RadioInputGroupColumn
      v-model="mobility.extremities"
      name="mobility"
      :options="nichteingeschraenkt_eingeschraenktOptions"
    />
  </div>
  <div>
    <label>Hilfsmittel:</label>
    <RadioInputGroupColumn
      v-model="mobility.devices.present"
      name="devices"
      :options="devicesOptions"
    />
  </div>
    <div v-if="mobility.devices.present == true">

    <div class="grid-container">
  <div class="grid-item" style="background-color: aliceblue;">
    <CheckboxInput
        v-model="mobility.devices.gehstock"
        :value="false"
        label="Gehstock"
      /></div>
      <div class="grid-item" style="background-color: white;">
    <CheckboxInput
        v-model="mobility.devices.rollator"
        :value="false"
        label="Rollator"
        /></div>
      <div class="grid-item" style="background-color: aliceblue;">
    <CheckboxInput
        v-model="mobility.devices.rollstuhl"
        :value="false"
        label="Rollstuhl"
        /></div>
        <div class="grid-item" style="background-color: white;">
      <CheckboxInput
        v-model="mobility.devices.fussheberschiene"
        :value="false"
        label="Fussheberschiene"
        /></div>
        <div class="grid-item" style="background-color: aliceblue;">
      <CheckboxInput
        v-model="mobility.devices.prothese"
        :value="false"
        label="Prothese"
        /></div>
        <div class="grid-item" style="background-color: white;">
      <CheckboxInput
        v-model="mobility.devices.andere"
        :value="false"
        label="andere Orthese"
        /></div>
    
    </div>
  </div>

</FormCard>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
import CheckboxInput from "./InputComponents/CheckboxInput.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";
import FormCard from "./FormCard.vue";
import RadioInputGroupColumn from "./InputComponents/RadioInputGroupColumn.vue";

const nichteingeschraenkt_eingeschraenktOptions = [
  { label: "nicht eingeschr.", value: "nicht_eingeschraenkt" },
  { label: "eingeschränkt", value: "eingeschraenkt" },
];

const devicesOptions = [
  { label: "nicht vorhanden", value: false },
  { label: "vorhanden", value: true },
];

const moeglich_nichtmoeglichOptions = [
  { label: "möglich", value: "moeglich" },
  { label: "nicht möglich", value: "nicht_moeglich" },
];

const mobility = ref({
  spine_movement: "",
  extremities: "",
  devices: {
    present: false,
    gehstock: false,
    rollator: false,
    rollstuhl: false,
    fussheberschiene: false,
    prothese: false,
    andere: false,
  },
  description: "",
});
/* populate fields with stored data */
onMounted(() => persistToLocalStorage(mobility, "mobility"));
/* use watch to retain inputted data via localStorage */
watch(
  mobility,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("mobility", JSON.stringify(mobility.value));
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
.grid-container {
  display: grid;
  grid-template-columns: 11rem 11rem 11rem;
  padding: 1px;
}

.grid-item {
  background-color: rgba(242, 245, 246, 0.8);
  text-align:start;
}
</style>
