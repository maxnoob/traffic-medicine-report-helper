<template>
  <form @submit.prevent class="shadow p-3 mb-5 bg-white rounded px-4">
    <!-- without @submit.prevent the page will reload after every button clicked-->

    <h4 class="py-2">Herz-Kreislauferkrankungen</h4>

    <div>
      <label>Herztöne:</label>
      <RadioInputGroup
        v-model="cardio.auscultation"
        name="auscultation"
        :options="auscultationOptions"
      />
    </div>

    <div>
      <CheckboxInput
        v-model="cardio.carotids"
        :value="false"
        label="keine Strömungsgeräusche über den Karotiden"
        name="carotids"
      />
    </div>
    <CheckboxInput
      v-model="cardio.heartinsuff_signs"
      :value="false"
      label="keine Unterschenkelödeme, kein gestauten Halsvenen"
    />

    <label>Kardiale Devices:</label>
    <RadioInputGroup
      v-model="cardio.devices"
      name="devices"
      :options="cardio_devicesOptions"
    />

    <div v-if="cardio.devices == 'vorhanden'">
      <CheckboxInput
        v-model="cardio.pacemaker"
        :value="false"
        label="Pacemaker"
      />
      <CheckboxInput v-model="cardio.icd" :value="false" label="ICD" />
      <CheckboxInput v-model="cardio.crt_d" :value="false" label="CRT-D" />
    </div>

  </form>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "@/components/InputComponents/RadioInputGroup.vue";
import CheckboxInput from "@/components/InputComponents/CheckboxInput.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";

const auscultationOptions = [
  { label: "normal", value: "normal" },
  {
    label: "nicht normal (Herzgeräusche, Extrasystolen etc.)",
    value: "nicht_normal",
  },
];

const cardio_devicesOptions = [
  { label: "nicht vorhanden", value: "nichtvorhanden" },
  { label: "vorhanden", value: "vorhanden" },
];


const cardio = ref({
  auscultation: "",
  carotids: false,
  heartinsuff_signs: false,
  devices: "",
  pacemaker: false,
  icd: false,
  crt_d: false,
  bemerkung: "",
});
/* populate fields with stored data */
onMounted(
  () => persistToLocalStorage(cardio,"cardio")
);
/* use watch to retain inputted data via localStorage */
watch(
  cardio,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("cardio", JSON.stringify(cardio.value));
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
