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
    <div class="bp-row">
      <div class="col">
        <input
          class="value_input"
          type="text"
          placeholder="sys mmHg"
          v-model="vitals.bloodpressure_sys"
        />
      </div>
      /
      <div class="col">
        <input
          class="value_input"
          type="text"
          placeholder="dia mmHg"
          v-model="vitals.bloodpressure_dia"
        />
      </div>
    </div>

    <label>Puls:</label>
    <!-- <div class="input-group input-group-sm mb-3"> -->
      <input type="text" class="value_input" placeholder="Schl./min" v-model="vitals.pulse" />
        <!-- <span class="input-group-text">Schl./min</span></div> -->
    <div>
      <input type="checkbox" value="regelm" v-model="vitals.puls_reg" />
      <label>regelmässig</label>
    </div>

    <div class="row"></div>

    <div class="grid-container">
      <div class="grid-item">
        <label>Grösse:</label>
        <input type="text" class="value_input" v-model="vitals.height" />
        <input type="checkbox" id="height_measured" />gemessen
      </div>
      <div class="grid-item">
        <label>Gewicht:</label>
        <input type="text" class="value_input" placeholder="kg" v-model="vitals.weight" />
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
          BMI
        </button>
      </div>
      <div class="col">
        <div v-if="bmi_show" style="white-space: nowrap; position: relative">
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
// import ValueInput from "./InputComponents/ValueInput.vue"; // TODO: make great value input component

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
});

const bmi_show = ref(false);

// Calculate BMI
function calcBMI(weight, height) {
  let bmi = (weight / (height / 100) ** 2).toPrecision(3);
  return bmi;
}
function bmi_clicked() {
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
  bmi_show.value = !bmi_show.value
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
/* input[type="text"] {
  width: 100px;
} */

.value_input {
  width: 100px;
  height: 40px;
  border-style: solid;
  border-width: 0.1cap;
  border-radius: 5px;
  border-color: lightgray;
}

input[type="text"].bp-input {
  width: 100px;
  height: 30px;
  border-style: solid;
  border-color: black;
}

.bp-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.bp-row .col {
  flex-grow: 0;
}

.grid-container {
  display: grid;
  grid-template-columns: 20rem 20rem;
  background-color: white;
}

.grid-item {
  background-color: white;
  text-align: start;
  border: none;
}
</style>
