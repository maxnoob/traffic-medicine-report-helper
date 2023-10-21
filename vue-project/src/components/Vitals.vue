<template>
    <form>
        <label>Blutdruck:</label>
        <input v-model="bloodpressure_sys">
        <input v-model="bloodpressure_dia">
        <label>Puls:</label>
        <input type="text" v-model="pulse">
        <p>Blutdruck: {{ bloodpressure_sys }}/{{ bloodpressure_dia }}</p>
        <div>
            <input type="checkbox" value="regelm" v-model="puls_reg">
            <label>regelmässig</label>
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

<style>
  form {
    max-width: 420px;
    margin: 30px auto; /* centers */
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
  }
  label {
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
  }
  input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box; /* total width is box plus border */
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
  }
</style>