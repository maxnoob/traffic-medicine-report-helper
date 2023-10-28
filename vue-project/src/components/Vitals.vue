<template>
    <form @submit.prevent> <!-- without @submit.prevent the page will reload after every button clicked-->
        <h4 class="py-2">Vitalparameter</h4>
        <label>Blutdruck:</label>
        <div class="row">
            <div class="col">
            <input type="text" placeholder="sys mmHg" v-model="bloodpressure_sys">
        </div>
        <div class="col">
            <input type="text" placeholder="dia mmHg" v-model="bloodpressure_dia" >
        </div>
        </div>

        <label>Puls:</label>
        <input type="text" placeholder="Schl./min" v-model="pulse">

        <div>
            <input type="checkbox" value="regelm" v-model="puls_reg">
            <label>regelmässig</label>
        </div>
        <label>Allgemeinzustand:</label>
        <div>
            <input type="radio" name="az" value="erhalten" id="erhalten" checked="true">
            <label class="radio_label" for="erhalten">erhalten</label>
        </div>
        <div>
            <input type="radio" name="az" value="reduziert" id="reduziert">
            <label class="radio_label" for="reduziert">reduziert</label>
        </div>
        <div class="row"></div>

        <div class="row">
            <div class="col">
                <label>Grösse:</label>
                <input type="text" placeholder="cm" v-model="height">
                <input type="checkbox" id="height_measured">gemessen
            </div>
            <div class="col">
                <label>Gewicht:</label>
                <input type="text" placeholder="kg" v-model="weight" >
                <input type="checkbox" id="weight_measured">gemessen
            </div>
        </div>

        <div class="row py-2">
            <div class="col">
                <button id="btn_bmi" class="btn btn-secondary btn-sm" @click="bmi_clicked()" style="white-space: nowrap;">BMI berechnen</button>
            </div>
            <div class="col">
                <div v-if="bmi" style="white-space: nowrap; position:relative">{{ bmi }} kg/m<sup>2</sup> (Norm: 18.5 - 25)</div>
            </div>
        </div>
    </form>

</template>


<script>
import { ref } from 'vue';
export default {
    data() {
        return {
            bloodpressure_sys: '',
            bloodpressure_dia: '',
            pulse: '',
            puls_reg:  false
        }
    },
    /* populate fields with stored data */
    mounted() {
    this.bloodpressure_sys = JSON.parse(localStorage.getItem('form')) || [];
  },
  /* use watch to retain inputted data via localStorage */
  watch: {
    bloodpressure_sys: {
        handler: function() {
            localStorage.setItem('form', JSON.stringify(this.bloodpressure_sys));
        },
        deep: true
        },
        form: {
        handler: function() {
            localStorage.setItem('form', JSON.stringify(this.bloodpressure_sys));
        },
        deep: true
        }
    },
    setup(){
    const weight = ref("");
    const height = ref("");
    const bmi = ref(null);
    // Calculate BMI
    function calcBMI(weight, height) {
        let bmi = (weight / (height/100)**2).toPrecision(3);
        return bmi
    }
    function bmi_clicked() {
        console.log(height.value + " | " + weight.value)
        console.log(typeof weight.value)
        let regex = new RegExp("^[0-9]{2,3}$");
        try {
            if (weight.value.match(regex) && height.value.match(regex)){
                bmi.value = calcBMI(weight.value, height.value);
            }
            else {
                alert("Grösse und Gewicht: Zahlen 10-999)")
            }
        } catch (error) {
            alert("Zur BMI-Berechnung Grösse und Gewicht angeben (Zahlen 10-999)")
        }
    }
    function saveValue() {
        console.log("change/keyup event triggered")
        var id = this.id;  // get the sender's id to save it 
        let val = "";
        if (this.type == "radio") {
            val = this.checked; // get status of current radio button
            let radio_group = this.name;
            var ele = document.getElementsByName(radio_group); // get all radio buttons from that group
            for (i = 0; i < ele.length; i++) {
                if (ele[i] != this) {  // unchecks all other radio buttons in localStorage of same group
                    ele[i].checked = false;
                    localStorage.setItem(ele[i].id, false);
                }
            }
        }
        else if (this.type == "checkbox") {
            val = this.checked; // get status of current radio button
        }
        else if (id == 'output'){
            val = this.innerText; // to store the generated text
        }
        else {
            val = this.value; // get the value
        }
        console.log(val)
        localStorage.setItem(id, val); // Every time user writing something, the localStorage's value will override
    }
    return {
        weight, height, bmi, bmi_clicked, saveValue
    }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type=text] {
    width:80px;
}
/*   form {
    max-width: 420px;
    margin: 30px auto; /* centers */
    /*background: transparent;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
 */

</style>