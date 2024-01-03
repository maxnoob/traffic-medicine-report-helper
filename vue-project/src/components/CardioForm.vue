<template>
  <FormCard>

    <h4 class="py-2">Herz-Kreislauferkrankungen</h4>

    <div class="d-flex py-2 ">
      <label class="def-label">Herztöne:</label>
      <RadioInputGroupColumn
        v-model="cardio.auscultation"
        name="auscultation"
        :options="auscultationOptions"
      />
    </div>
    <div>
    <div>
      <CheckboxInput
        v-model="cardio.carotids"
        :value="false"
        label="keine Strömungsgeräusche über den Karotiden"
        name="carotids"
      />
    </div>
    <CheckboxInput
      v-model="cardio.heartinsuff_zeichen"
      :value="false"
      label="keine Unterschenkelödeme, kein gestauten Halsvenen"
    />
    </div>
    <div class="d-flex py-2 ">
      <label class="def-label">Kardiale Devices:</label>
      <RadioInputGroupColumn
      v-model="cardio.devices"
      name="devices"
      :options="cardio_devicesOptions"
    />
  </div>
    <div v-if="cardio.devices == 'vorhanden'">
      <div class="grid-container">
  <div class="grid-item" style="background-color: aliceblue;"><CheckboxInput v-model="cardio.pacemaker" :value="false" label="Pacemaker"/></div>
  <div class="grid-item" style="background-color: white;"><CheckboxInput v-model="cardio.icd" :value="false" label="ICD"/></div>
  <div class="grid-item" style="background-color: aliceblue;"><CheckboxInput v-model="cardio.crt_d" :value="false" label="CRT-D"/></div>
  </div>
  </div>

</FormCard>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "@/components/InputComponents/RadioInputGroup.vue";
import CheckboxInput from "@/components/InputComponents/CheckboxInput.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";
import FormCard from "./FormCard.vue";
import RadioInputGroupColumn from "./InputComponents/RadioInputGroupColumn.vue";

const auscultationOptions = [
  { label: "normal", value: "normal" },
  {
    label: "nicht normal",
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
  heartinsuff_zeichen: false,
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
.grid-container {
  display: grid;
  grid-template-columns: 10rem 10rem 10rem;
  padding: 1px;
}

.grid-item {
  text-align:start;
}
.def-label {
  width: 200px;
}
</style>