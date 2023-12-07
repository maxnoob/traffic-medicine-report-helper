<template>
  <!-- <Modal /> -->
  <body>
    <div class="container" id="top_container">
      <div class="second_container">
        <div class="row">
          <h1 class="py-3">Status erfassen</h1>
        </div>
        <hr />
        <!-- Basic Data / Stammdaten -->
        <BasicDataForm />
        <!---- Vitals  / Vitalparameter---->
        <VitalsForm ref="vitalsFormRef" />
        <!----- Vision / Sehvermögen ----->
        <VisionForm />
        <HearingForm />
        <Substance />
        <Psych />
        <!-- Organisch bedingte Hirnleistungsstörungen -->
        <KognitionForm />
        <!----- Neurology / Neurologische Erkrankungen ----->
        <NeuroForm />
        <!----- Cardiopulmonal / Herz-Kreislauferkrankungen ----->
        <CardioForm />
        <!----- Stoffwechselerkrankungen ----->
        <MetaboForm />
        <!----- Atem- und Bauchorganerkrankungen ----->
        <AirwayIntenstineForm />
        <!----- Wirbelsäule und Bewegungsapparat ----->
        <MobilityForm />
        <!----- Buttons ----->
        <div
          class="d-sm-flex flex-row justify-content-evenly"
          style="max-width: 70vw"
        >
          <div>
            <button id="btn_values" class="btn btn-secondary my-3">
              Werte ausgeben
            </button>
          </div>
          <div>
            <button
              id="btn_text"
              class="btn btn-primary my-3"
              @click="text_btn_clicked()"
            >
              Text generieren
            </button>
          </div>
          <div>
            <button
              id="btn_clear"
              class="btn btn-danger my-3"
              @click="clear_btn_clicked()"
            >
              Werte löschen
            </button>
          </div>
        </div>

        <!-- If the generated text gets changed by the user, output-edited event gets emitted within GeneratedText component -->
        <GeneratedText
          v-bind:bmi="bmi"
          ref="generatedTextRef"
          @output-edited="outputEdited=true"
          @make-buttons-visible="textButtons=true"
        />

        <!-- <div id="output" contenteditable="false"></div> -->

        <div class="row">
          <div v-if="textButtons">
          <button
            id="btn_copy"
            class="btn btn-primary my-2"
            @click="copyText()"
          >
            in Zwischenablage kopieren
          </button>
          <button id="btn_download" class="btn btn-success">
            als Datei speichern
          </button>
        </div>
        <div>
          <button class="btn btn-success" @click="darkmode()">darkmode</button>
        </div>
        </div>

        <!-- snackbar for showing confirmation message after copying -->
        <Snackbar />
      </div>
    </div>
    <img
      src="./assets/BFH_Logo_deutsch.png"
      alt="BFH Logo"
      style="
        max-width: 50px;
        height: auto;
        display: -webkit-box;
        margin-left: auto;
      "
    />
  </body>
</template>

<script>
import VitalsForm from "./components/VitalsForm.vue";
import BasicDataForm from "./components/BasicDataForm.vue";
import Snackbar from "./components/Snackbar.vue";
import VisionForm from "./components/VisionForm.vue";
import NeuroForm from "./components/NeuroForm.vue";
import CardioForm from "./components/CardioForm.vue";
import MetaboForm from "./components/MetaboForm.vue";
import AirwayIntenstineForm from "./components/AirwayIntenstineForm.vue";
import MobilityForm from "./components/MobilityForm.vue";
import KognitionForm from "./components/KognitionForm.vue";
import GeneratedText from "./components/GeneratedText.vue";
import HearingForm from "./components/HearingForm.vue";
import Substance from "./components/Substance.vue";
import Psych from "./components/Psych.vue";

export default {
  name: "App",
  components: {
    BasicDataForm,
    VitalsForm,
    VisionForm,
    NeuroForm,
    Snackbar,
    CardioForm,
    MetaboForm,
    AirwayIntenstineForm,
    MobilityForm,
    KognitionForm,
    GeneratedText,
    Substance,
    HearingForm,
    Psych,
  },
  methods: {
    triggerSnackbar() {
      console.log("snackbar button clicked");
      this.$emit("triggerSnackbar");
    },
    // --------------------------------- Deleting user input -------------------------------------
    clear_btn_clicked() {
      if (
        confirm(
          'Alle erfassten Werte sicher löschen? \nKlicke auf "Abbrechen" um die Werte zu behalten. \nKlicke auf "OK" um alle erfassten Werte zu löschen.'
        )
      ) {
        localStorage.clear();
        location.reload(); // reloads the page the get the default checked boxes
      }
    },
  },
};
</script>

<script setup>
import { ref, unref } from "vue";
// Create a refs for the child components
const generatedTextRef = ref(null);
const vitalsFormRef = ref(null); // vitalsRef really necessary?
let storage = null;
let outputEdited = false;
const textButtons = ref(false); // use ref to let the variable update, when the event is emitted from child component!
// ---------------------------------- Generate text ------------------------------------------------------
// Handles text button logic; catches if user previously did changes to generated text
function text_btn_clicked() {
  console.log("edited: " + outputEdited);
  if (inputValidation()) {
    if (outputEdited) {
      if (
        confirm(
          'Der Text wurde bearbeitet. Wirklich neuen Text generieren?\n\nKlicke auf "OK" um den Text neu zu generieren. Änderungen gehen verloren.\nKlicke auf "Abbrechen" um den geänderten Text zu behalten.'
        )
      ) {
        if (unref(generatedTextRef)) {
          storage = allStorage()
          outputEdited = false;
          generatedTextRef.value.generateText(storage);
        }
      }
    } else {
      if (unref(generatedTextRef)) {
        storage = allStorage()
        outputEdited = false;
        generatedTextRef.value.generateText(storage);
      }
    }
  }
}

// Checks if one of the gender radio buttons is checked
function inputValidation() {
  let basic = JSON.parse(localStorage.getItem("basic"));
  console.log("gender " + basic.gender);
  if (basic.gender !== "m" && basic.gender !== "f") {
    alert("Geschlecht auswählen");
    return false;
  }
  return true;
}

// Retrieves all json in localStorage. can be accessed e.g. via "storage.basic.gender".
function allStorage() {
  let values = {};
  const keys = Object.keys(localStorage);
  for (let i in keys) {
    console.log(keys[i]);
    values[keys[i]] = JSON.parse(localStorage.getItem(keys[i]));
  }
  return values;
}


// Copy text to clipboard
function copyText() {
  const content = document.querySelector("#output").innerText;
  // navigator.clipboard.writeText(content);
  try {
    navigator.clipboard.writeText(content);
    showSnackbarMessage("Text kopiert! ✅");
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
function showSnackbarMessage(text) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
  x.innerText = text;
  // Add the "show" class to DIV
  x.className = "show";
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
function darkmode() {
  var x = document.getElementById("top_container");
  x.classList.toggle("darkmode");
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center; */
  color: #2c3e50;
  /*margin-top: 60px; */
}

html,
body {
  background: linear-gradient(
    90deg,
    rgba(206, 230, 255, 1) 51%,
    rgba(221, 249, 212, 1) 100%,
    rgba(151, 176, 252, 0) 100%
  );
  margin: 0;
  padding: 0px;
}

label {
  margin: 5px 0 5px;
  letter-spacing: 1px;
  font-size: 0.9em;
  /*text-transform: uppercase;*/
}
input[type="date"],
input[type="text"] {
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
/* .colormode {
    background: linear-gradient(90deg, rgba(206,230,255,1) 51%, rgba(221,249,212,1) 100%, rgba(151,176,252,0) 100%);
  } */

.darkmode {
  background: #121212 !important;
  color: #fafafa;
}

.container {
  min-width: 100vw;
  min-height: 100vh;
}

.second_container {
  padding-top: 60px;
  margin-left: 60px;
}
</style>
