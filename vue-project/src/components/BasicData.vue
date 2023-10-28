<template>
    <div class="row  d-inline-flex">
            <div class="col">
                <div ref="gender">
                    <label>Geschlecht:</label>
                    <div>
                        <div class="row "></div>
                        <div v-for='gender in genders'> 
                        <input type='radio' name='gender_radio' v-bind:value='gender' v-model='genders'>
                        <label class="radio_label" v-bind:for='gender'>{{ gender }} </label>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="field">
                    <label>Geburtsdatum:</label>
                    <input type="date" v-model="selectedDate" @change="handleDateChange" ref="birthdate_input" name="birthdate"/>
                </div>
            </div>
            <div class="col">
                <!-- age only gets displayed, when in certain range  -->
                <div class="py-4" v-if="age < 120 && age > 0" style="white-space: nowrap;"> {{ age }} Jahre </div>
            </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
    const genders = ['m', 'f'];
    const age = ref('');
    const handleDateChange = (event) => {
        // Access the selected date from the event object
        const selectedDate = event.target.value;
        console.log("Selected date:", selectedDate);
        age.value = getAge(selectedDate); // assign the ref's value, not the ref itself!
        console.log(age.value)
        function getAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                calculatedAge--;
            }
            return calculatedAge;
        }
    }
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

<style>
/* add "scoped" to tyle tag to limit styling to this component */
.radio_label {
      padding: 0px 1em 0px 4px;
    } 

</style>