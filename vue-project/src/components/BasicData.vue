<template>
  <h4 class="py-2">Stammdaten</h4>
  <div class="row d-inline-flex">
    <div class="col">
      <div ref="gender">
        <label>Geschlecht:</label>
        <div>
          <div class="row"></div>
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
    </div>
    <div class="col">
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
    </div>
    <div class="col">
      <!-- age only gets displayed, when in certain range  -->
      <div
        class="py-4"
        v-if="basic.age < 120 && basic.age > 0"
        style="white-space: nowrap"
      >
        {{ basic.age }} Jahre
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
const genders = ["m", "f"];
const basic = ref({
  gender: "",
  age: "",
  birthDate: "",
});
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
onMounted(
  () =>
    (basic.value =
      JSON.parse(localStorage.getItem("basic")) ||
      JSON.stringify(this.basic.value))
); // TODO: throws "Uncaught TypeError" after emptied field, but still works...
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
    },
    mounted(){
        /*
        The code below does not work. So radio button are hardcoded in HTML... :(
        // Generate the radio buttons for gender
        const gender = ref()
        const genders = ['m', 'f'];
        gender.value += genders.map((gender) => `<div>
            <input type="radio" name="gender" value="${gender}" id="${gender}_input">
                <label for="${gender}">${gender}</label>
        </div>`).join(' ');
        
        //console.log(gender.value)
    }

}
*/-->

<style scoped>
/* add "scoped" to tyle tag to limit styling to this component */
.radio_label {
  padding: 0px 1em 0px 4px;
}
</style>
