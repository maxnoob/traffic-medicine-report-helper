<template>
    <form @submit.prevent> <!-- without @submit.prevent the page will reload after every button clicked-->
        <h4 class="py-2">Vitalparameter</h4>
        <label>Blutdruck:</label>
        <div class="row">
            <div class="col">
            <input type="text" placeholder="sys mmHg" v-model="vitals.bloodpressure_sys">
        </div>
        <div class="col">
            <input type="text" placeholder="dia mmHg" v-model="vitals.bloodpressure_dia" >
        </div>
        </div>

        <label>Puls:</label>
        <input type="text" placeholder="Schl./min" v-model="vitals.pulse">

        <div>
            <input type="checkbox" value="regelm" v-model="vitals.puls_reg">
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
                <input type="text" placeholder="cm" v-model="vitals.height">
                <input type="checkbox" id="height_measured">gemessen
            </div>
            <div class="col">
                <label>Gewicht:</label>
                <input type="text" placeholder="kg" v-model="vitals.weight" >
                <input type="checkbox" id="weight_measured">gemessen
            </div>
        </div>

        <div class="row py-2">
            <div class="col">
                <button id="btn_bmi" class="btn btn-secondary btn-sm" @click="bmi_clicked()" style="white-space: nowrap;">BMI berechnen</button>
            </div>
            <div class="col">
                <div v-if="vitals.bmi" style="white-space: nowrap; position:relative">{{ vitals.bmi }} kg/m<sup>2</sup> (Norm: 18.5 - 25)</div>
            </div>
        </div>
    </form>

</template>


<script setup>
import { onMounted, ref, watch } from 'vue';
    const vitals = ref({
            bloodpressure_sys: "",
            bloodpressure_dia: "",
            pulse: '',
            puls_reg:  false,
            height: '',
            weight: '',
            az: true,
            bmi: null
        })
    // Calculate BMI
    function calcBMI(weight, height) {
        let bmi = (weight / (height/100)**2).toPrecision(3);
        return bmi
    }
    function bmi_clicked() {
        console.log(vitals.height.value + " | " + vitals.weight.value)
        console.log(typeof vitals.weight.value)
        let regex = new RegExp("^[0-9]{2,3}$");
        try {
            if (vitals.weight.value.match(regex) && vitals.height.value.match(regex)){
                vitals.bmi.value = calcBMI(vitals.weight.value, vitals.height.value);
            }
            else {
                alert("Grösse und Gewicht: Zahlen 10-999)")
            }
        } catch (error) {
            alert("Zur BMI-Berechnung Grösse und Gewicht angeben (Zahlen 10-999)")
        }
    }
    /* populate fields with stored data */
    onMounted(() => 
        vitals.value = JSON.parse(localStorage.getItem('vitals')) || JSON.stringify(this.vitals.value)
    ) // TODO: throws "Uncaught TypeError" after emptied field, but still works...
    /* use watch to retain inputted data via localStorage */
    watch(vitals, () => {
        console.log("watcher triggered");
        localStorage.setItem('vitals', JSON.stringify(vitals.value));
            }, { deep: true }, { immediate: true }
        )
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type=text] {
    width:80px;
}

</style>