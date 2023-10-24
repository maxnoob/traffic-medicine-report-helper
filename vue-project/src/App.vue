<template>
  <!-- <Modal /> -->


  <body class="bg-body-tertiary">
    <div class="container">
        <div class="row">
            <h1 class="py-3">Status erfassen</h1>
        </div>
        <hr />

         <!-- Basic Data / Stammdaten -->
        <h4 class="py-2">Stammdaten</h4>
        <BasicData />


        <!---- Vitals ---->
        <hr />
        <h4 class="py-2">Vitalparameter</h4>
        <div class="row d-inline-flex">
            <Vitals />
        </div>

        <!----- Vision ----->
        <hr />
        <h4 class="py-2">Sehvermögen</h4>

        <div class="row py-2">
            <div id="vision_aid_present"></div>
        </div>

        <div class="row py-2 vision_extended">
            <div id="vision_aid"></div>
        </div>

        <div class="row d-inline-flex py-2">
            <div class="col">
                <div id="vis_uncorr_re"></div>
            </div>
            <div class="col">
                <div id="vis_uncorr_li" style="margin-left: -60px; margin-right: 50px;"></div>
            </div>
        </div>

        <div id="vision_corrected" class="row d-inline-flex py-2 vision_extended">
            <div class="col">
                <div id="vis_corr_re"></div>
            </div>
            <div class="col">
                <div id="vis_corr_li" style="margin-left: -50px;"></div>
            </div>
        </div>

        <div class="row py-2">
            <div id="vis_field"></div>
        </div>

        <div class="row py-2">
            <div id="pupil"></div>
        </div>

        <div class="row py-2">
            <div id="nystag"></div>
        </div>

        <div class="row py-2">
            <div id="eye_motility"></div>
        </div>

        <div class="row py-2">
            <div id="lang_stereo"></div>
        </div>

        <!----- Hearing ----->
        <hr />
        <h4 class="py-2">Hörvermögen</h4>
        <div class="row">
            <div id="hearing_3m"></div>
        </div>
        <div class="row d-inline-flex py-2">
            <div class="col">
                <div id="weber_rinne"></div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div id="weber"></div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div id="rinne"></div>
            </div>
        </div>

        <!----- Substance abuse ----->
        <hr />
        <h4 class="py-2">Stigmata</h4>
        <div class="row py-2">
            <div id="liver"></div>
        </div>

        <!----- Neurology ----->
        <hr />
        <h4 class="py-2">Neurologie</h4>
        <div class="row d-inline-flex">
            <div class="col">
                <div id="vib_thumb_re"></div>
            </div>

            <div class="col">
                <div id="vib_thumb_li" style="margin-left: -120px;"></div>
            </div>
        </div>
        <div class="row"></div>

        <div class="row d-inline-flex py-2">
            <div class="col">
                <div id="vib_ankle_re"></div>
            </div>
            <div class="col">
                <div id="vib_ankle_li" style="margin-left: -130px;"></div>
            </div>
            <div class="col">
                <div id="bigtoe"></div>
            </div>
        </div>

        <!----- Cardiopulmonal ----->
        <hr />
        <h4 class="py-2 d-inline-flex">Kardiopulmonal</h4> <button id="btn_cardio_clear" class="btn btn-sm" style="float: right; opacity: 50%;">x</button>

        <div class="row py-2">
            <div id="heart_auscultation"></div>
        </div>

        <div class="row py-2">
            <div id="carotis"></div>
        </div>





        <!-- TODO -->

        <hr />

        <!----- Kognition ----->
        <!-- <hr />
        <h4 class="py-2">Kognition</h4>  -->
        <!-- TODO -->

        <div class="row"></div>

        <button id="btn_values" class="btn btn-secondary my-3">Werte ausgeben</button>
        <button id="btn_text" class="btn btn-primary my-3" >Text generieren</button>
        <button id="btn_clear" class="btn btn-danger my-3" @click="clear_btn_clicked()">Werte löschen</button>

        <div id="output" contenteditable="false"></div>

        <div class="row">
            <button id="btn_copy" class="btn btn-primary my-2" @click="showSnackbarMessage('Text kopiert! ✅')">in Zwischenablage kopieren</button>
            <button id="btn_download" class="btn btn-success">als Datei speichern</button>
        </div>

        <!-- snackbar for showing confirmation message after copying -->
        <Snackbar />
    </div>
    

</body>
</template>

<script>
import Modal from './components/Modal.vue'
import Vitals from './components/Vitals.vue'
import BasicData from './components/BasicData.vue'
import Snackbar from './components/Snackbar.vue'


export default {
  name: 'App',
  components: {
    Modal,
    BasicData,
    Vitals,
    Snackbar
  },
  methods: {
    triggerSnackbar() {
    console.log("snackbar button clicked")
    this.$emit('triggerSnackbar')
},
    showSnackbarMessage(text) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
        x.innerText = text;
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      },
          // --------------------------------- Deleting user input -------------------------------------
              // Delete values in input fields and unchecks radio buttons
    clearInputFields() { // TODO: does not work in Vue so far..... :()
        var ele = document.getElementsByTagName('input');
        var i;
        for (i = 0; i < ele.length; i++) {
            if (ele[i].type == "radio" || ele[i].type == "checkbox") {
                ele[i].checked = false;
            }
            else {
                document.getElementById(ele[i].id).value = "";
            }
        }
        localStorage.clear() // Deletes all data local storage
        document.querySelector('#output').innerText = ""; // Deletes generated text
        document.querySelector('#btn_download').style.display = 'none'; // Hides download button
        document.querySelector('#btn_copy').style.display = 'none'; // Hides copy button
    },
    clear_btn_clicked() {
        if (confirm("Alle erfassten Werte sicher löschen? \nKlicke auf \"Abbrechen\" um die Werte zu behalten. \nKlicke auf \"OK\" um alle erfassten Werte zu löschen.")){
            this.clearInputFields();
            location.reload(); // reloads the page the get the default checked boxes
        }
    },


},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
body {
    background: rgb(206,230,255);
    background: linear-gradient(90deg, rgba(206,230,255,1) 51%, rgba(221,249,212,1) 100%, rgba(151,176,252,0) 100%);
}
label {
    margin: 5px 0 5px;
    letter-spacing: 1px;
    font-size: 0.9em;
    /*text-transform: uppercase;*/
  }
  input[type="date"], input[type="text"] {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box; /* total width is box plus border */
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
  }
  input[type="date"] {
    width: 120px;
  }
  input[type="checkbox"] {
    display: inline-block;
    width: 16px;
    margin: 0 10px 0 0;
    position: relative;
    top: 2px;
  }
</style>
