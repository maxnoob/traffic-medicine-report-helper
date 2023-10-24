<template>
    <form>
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
        <div class="row d-inline-flex py-2">
            <div class="col">
                <div id="height"></div>
            </div>
            <div class="col">
                <div id="weight"></div>
            </div>
            <div class="col">
                <div id="measured" style="margin-top: 30px;"></div>
            </div>
        </div>
        <div class="row"></div>
        <div class="row d-inline-flex py-2">
            <div class="col">
                <button id="btn_bmi" class="btn btn-secondary btn-sm" style="white-space: nowrap;">BMI berechnen</button>
            </div>
            <div class="col">
                <div id="bmi" style="white-space: nowrap;"></div>
            </div>
        </div>
        <p>Blutdruck: {{ bloodpressure_sys }}/{{ bloodpressure_dia }}</p>
    </form>
</template>


<script>
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