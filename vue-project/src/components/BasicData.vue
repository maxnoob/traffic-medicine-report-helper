<template>
    <div class="row d-inline-flex py-2">
            <div class="col">
                <div ref="gender">
                    <label>Geschlecht:</label>
                    <div>
                        <input type="radio" name="gender" value="m" id="m_input">
                        <label for="m_input">m</label>
                        <input type="radio" name="gender" value="w" id="w_input">
                        <label for="w_input">w</label>
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
                <!-- age only gets displayed, when in certain range -->
                <div ref="age" v-if="age < 120 && age > 0" class="py-4" style="white-space: nowrap;"> {{ age }} Jahre</div>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          selectedDate: null,
          age: null
        };
      },
      methods: {
        handleDateChange(event) {
            // Access the selected date from the event object
            const selectedDate = event.target.value;
            // Do something with the selected date
            console.log("Selected date:", selectedDate);
            console.log("date changed")
            this.age = getAge(selectedDate);
            console.log(this.age)
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
            return this.age;
        }
      }


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
    */
}


</script>