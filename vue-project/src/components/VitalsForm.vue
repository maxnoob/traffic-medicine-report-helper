<template>
  <FormCard>
    <!-- without @submit.prevent the page will reload after every button clicked-->
    <h4 class="py-2">Vitalparameter</h4>
    <label>Allgemeinzustand:</label>
    <RadioInputGroup
      name="az"
      :options="azOptions"
      v-model="vitals.az"
      vertical
    />
    <label>Blutdruck:</label>
    <div class="row">
      <div class="col">
        <input
          type="text"
          placeholder="sys mmHg"
          v-model="vitals.bloodpressure_sys"
        />
      </div>
      <div class="col">
        <input
          type="text"
          placeholder="dia mmHg"
          v-model="vitals.bloodpressure_dia"
        />
      </div>
    </div>

    <label>Puls:</label>
    <input type="text" placeholder="Schl./min" v-model="vitals.pulse" />

    <div>
      <input type="checkbox" value="regelm" v-model="vitals.puls_reg" />
      <label>regelmässig</label>
    </div>

    <div class="row"></div>

    <div class="row">
      <div class="col">
        <label>Grösse:</label>
        <input type="text" placeholder="cm" v-model="vitals.height" />
        <input type="checkbox" id="height_measured" />gemessen
      </div>
      <div class="col">
        <label>Gewicht:</label>
        <input type="text" placeholder="kg" v-model="vitals.weight" />
        <input type="checkbox" id="weight_measured" />gemessen
      </div>
    </div>

    <div class="row py-2">
      <div class="col">
        <button
          id="btn_bmi"
          class="btn btn-secondary btn-sm"
          @click="bmi_clicked()"
          style="white-space: nowrap"
        >
          BMI berechnen
        </button>
      </div>
      <div class="col">
        <div v-if="vitals.bmi" style="white-space: nowrap; position: relative">
          {{ vitals.bmi }} kg/m<sup>2</sup> (Norm: 18.5 - 25)
        </div>
      </div>
    </div>
  </FormCard>
</template>

<script setup>
// access specific value with "vitals.value.[specificvalue]"
import { onMounted, ref, watch } from "vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";
import FormCard from "./FormCard.vue";

const azOptions = [
  { label: "erhalten", value: "erhalten" },
  { label: "nicht erhalten", value: "nicht_erhalten" },
];

/* // a computed ref -> doesn't work with ref; using reactive throws error
const bmi = computed(() => {
  return (vitals.value.weight / (vitals.value.height / 100) ** 2).toPrecision(3);
}); */

const vitals = ref({
  bloodpressure_sys: "",
  bloodpressure_dia: "",
  pulse: "",
  puls_reg: false,
  height: "",
  weight: "",
  az: "erhalten",
  bmi: null,
});

defineExpose({
  calcBMI,
})

// Calculate BMI
function calcBMI(weight, height) {
  let bmi = (weight / (height / 100) ** 2).toPrecision(3);
  return bmi;
}
function bmi_clicked() {
  console.log(typeof vitals.value.weight);
  let regex = new RegExp("^[0-9]{2,3}$");
  try {
    if (vitals.value.weight.match(regex) && vitals.value.height.match(regex)) {
      vitals.value.bmi = calcBMI(vitals.value.weight, vitals.value.height);
    } else {
      alert("Grösse und Gewicht: Zahlen 10-999)");
    }
  } catch (error) {
    alert("Zur BMI-Berechnung Grösse und Gewicht angeben (Zahlen 10-999)");
  }
}
/* populate fields with stored data */
onMounted(() => persistToLocalStorage(vitals, "vitals"));

/* use watch to retain inputted data via localStorage */
watch(
  vitals,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("vitals", JSON.stringify(vitals.value));
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
</style>
