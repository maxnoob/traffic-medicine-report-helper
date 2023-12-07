<template>
  <form @submit.prevent class="shadow p-3 mb-5 bg-white rounded px-4">
    <!-- without @submit.prevent the page will reload after every button clicked-->

    <h4 class="py-2">Wirbelsäule und Bewegungsapparat</h4>

    <div>
      <label
        >rasche Kopfdrehung 45° links/rechts und langsame Oberkörperdrehung 90°
        links/rechts:</label
      >
      <RadioInputGroup
        v-model="mobility.spine_movement"
        name="spine_movement"
        :options="moeglich_nichtmoeglichOptions"
      />
    </div>
    <div v-if="mobility.spine_movement == 'nicht_moeglich'">
      <input type="text" v-model="mobility.description" />
    </div>

    <label>Extremitätenbeweglichkeit:</label>
    <RadioInputGroup
      v-model="mobility.extremities"
      name="mobility"
      :options="nichteingeschraenkt_eingeschraenktOptions"
    />

    <label>Hilfsmittel:</label>
    <RadioInputGroup
      v-model="mobility.devices.present"
      name="devices"
      :options="devicesOptions"
    />

    <div v-if="mobility.devices.present == true">
      <CheckboxInput
        v-model="mobility.devices.gehstock"
        :value="false"
        label="Gehstock"
      />
      <CheckboxInput
        v-model="mobility.devices.rollator"
        :value="false"
        label="Rollator"
      />
      <CheckboxInput
        v-model="mobility.devices.rollstuhl"
        :value="false"
        label="Rollstuhl"
      />
      <CheckboxInput
        v-model="mobility.devices.fussheberschiene"
        :value="false"
        label="Fussheberschiene"
      />
      <CheckboxInput
        v-model="mobility.devices.prothese"
        :value="false"
        label="Prothese"
      />
      <CheckboxInput
        v-model="mobility.devices.andere"
        :value="false"
        label="andere Orthese"
      />
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
import CheckboxInput from "./InputComponents/CheckboxInput.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";

const nichteingeschraenkt_eingeschraenktOptions = [
  { label: "nicht eingeschränkt", value: "nicht_eingeschraenkt" },
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
input[type="text"] {
  width: 80px;
}

label {
  margin-left: 6px;
}
</style>
