<template>
  <form @submit.prevent class="shadow p-3 mb-5 bg-white rounded px-4">
    <!-- without @submit.prevent the page will reload after every button clicked-->

    <h4 class="py-2">Wirbelsäule und Bewegungsapparat</h4>

    <div>
      <label>rasche Kopfdrehung 45° links/rechts und langsame Oberkörperdrehung 90° links/rechts:</label>
      <RadioInputGroup
        v-model="spine_ms.spine_movement"
        name="spine_movement"
        :options="moeglich_nichtmoeglichOptions"
      />
    </div>
    <div v-if="spine_ms.spine_movement == 'nicht_moeglich'">
      <input type="text" v-model="spine_ms.description"/>
    </div>

    <label>Extremitätenbeweglichkeit:</label>
    <RadioInputGroup
      v-model="spine_ms.extr_mobility"
      name="mobility"
      :options="nichteingeschraenkt_eingeschraenktOptions"
    />

    <label>Hilfsmittel:</label>
    <RadioInputGroup
      v-model="spine_ms.devices"
      name="devices"
      :options="mobility_devicesOptions"
    />

    <div v-if="spine_ms.devices == 'vorhanden'">
      <CheckboxInput
        v-model="spine_ms.gehstock"
        :value="false"
        label="Gehstock"
      />
      <CheckboxInput v-model="spine_ms.rollator" :value="false" label="Rollator" />
      <CheckboxInput v-model="spine_ms.rollstuhl" :value="false" label="Rollstuhl" />
      <CheckboxInput v-model="spine_ms.fussheberschiene" :value="false" label="Fussheberschiene" />
      <CheckboxInput v-model="spine_ms.prothese" :value="false" label="Prothese" />
      <CheckboxInput v-model="spine_ms.andere" :value="false" label="andere Orthese" />
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
  {label: "eingeschränkt", value: "eingeschraenkt",
  },
];

const mobility_devicesOptions = [
  { label: "nicht vorhanden", value: "nichtvorhanden" },
  { label: "vorhanden", value: "vorhanden" },
];

const moeglich_nichtmoeglichOptions = [
  { label: "möglich", value: "moeglich" },
  { label: "nicht möglich", value: "nicht_moeglich" },
];


const spine_ms = ref({
  spine_movement: "",
  extr_mobility: "",
  devices: "",
  gehstock: false,
  rollator: false,
  rollstuhl: false,
  fussheberschiene: false,
  prothese: false,
  andere: false,
  description: false
});
/* populate fields with stored data */
onMounted(
  () => persistToLocalStorage(spine_ms,"spine_ms")
);
/* use watch to retain inputted data via localStorage */
watch(
  spine_ms,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("spine_ms", JSON.stringify(spine_ms.value));
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
