<template>
  <FormCard>
    <h4 class="py-2">Stammdaten</h4>
    <div class="row d-inline-flex">
      <div class="col">
        <div ref="gender">
          <label>Geschlecht:</label>
          <!-- for-loop that creates the radio buttons; on refresh, if value of clicked button is in storage, the button gets checked -->
          <div v-for="gender in genders" v-bind:key="gender.id">
            <input
              type="radio"
              v-bind:checked="gender == basic.gender"
              name="gender_radio"
              v-bind:value="gender"
              @change="updateGender"
            />
            <label class="radio_label" v-bind:for="gender">{{ gender }} </label>
          </div>
        </div>
      </div>

      <div class="col" style="padding-left: 4rem">
        <div class="field">
          <label>Geburtsdatum:</label>
          <input
            type="date"
            v-model="basic.birthDate"
            @change="handleDateChange"
            ref="birthdate_input"
            name="birthdate"
          />
        </div>

        <div
          v-if="basic.age < 120 && basic.age > 0"
          style="white-space: nowrap"
        >
          {{ basic.age }} Jahre
        </div>
        <div v-else style="height: 1.5rem">
          <!-- this div is for compensating the above div with the age -->
        </div>
      </div>

      <div class="col" style="padding-left: 4rem">
        <label class="def-label">Medizinische Gruppe:</label>
        <RadioInputGroup
          v-model="basic.medgroup"
          name="medgroup"
          :options="medgroupOptions"
          vertical
        />
      </div>
    </div>
  </FormCard>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";
import FormCard from "./FormCard.vue";
import RadioInputGroup from "./InputComponents/RadioInputGroup.vue";

const genders = ["m", "f"];
const basic = ref({
  gender: "",
  age: "",
  birthDate: "",
  medgroup: 1,
});

const medgroupOptions = [
  { label: "1 (A/B/A1/B1/FGM)", value: 1 },
  { label: "2 (C/D/C1/D1/BPT/VE)", value: 2, id: "group2" },
];

function updateGender(event) {
  basic.value.gender = event.target.value;
}
const handleDateChange = (event) => {
  // Access the selected date from the event object
  basic.value.birthDate = event.target.value;
  const selectedDate = basic.value.birthDate;
  console.log("Selected date:", selectedDate);
  basic.value.age = getAge(selectedDate); // assign the ref's value, not the ref itself!
  console.log(basic.value.age);
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    if (calculatedAge < 120 && calculatedAge > 0) {
      return calculatedAge;
    }
  }
};
/* populate fields with stored data */
onMounted(() => persistToLocalStorage(basic, "basic"));
/* watcher to save all inputted data to localStorage */
watch(
  basic,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("basic", JSON.stringify(basic.value));
  },
  { deep: true },
  { immediate: true }
);
</script>

<!--
    /*
    Didnt get version with Composition API to work -.-
    name: 'BasicData',
    setup() {
        console.log("loading basic data form")
        const birthdate_input = ref(null);
        //const birthdate_input_value = birthdate_input.value;
        const age = ref(null);
        let calculated_age;
        watchEffect(() => {
            console.log("date changed")
            //console.log(birthdate_input_value)
            calculated_age = getAge(birthdate_input.value);
            age.value = calculated_age + " Jahre"
            function getAge(dateString) {
                var today = new Date();
                var birthDate = new Date(dateString);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age + "";
            }
        })
         ,
    created() {
    }
*/-->

<style scoped>
/* add "scoped" to tyle tag to limit styling to this component */
.radio_label {
  padding: 0px 1em 0px 4px;
}

/* Transitions */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
