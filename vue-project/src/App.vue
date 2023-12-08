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
          class="d-md-flex justify-content-evenly"
          
        >
          <div>
            <button
              id="btn_text"
              class="btn btn-primary my-3"
              @click="text_btn_clicked()"
            >
              Text generieren
              <svg
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-body-text"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
                />
              </svg>
            </button>
          </div>
          <div>
            <button
              id="btn_clear"
              class="btn btn-danger my-3"
              @click="clear_btn_clicked()"
            >
              Werte löschen
              <svg
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- If the generated text gets changed by the user, output-edited event gets emitted within GeneratedText component -->
        <GeneratedText
          v-bind:bmi="bmi"
          ref="generatedTextRef"
          @output-edited="outputEdited = true"
          @make-buttons-visible="textButtons = true"
        />

        <!-- <div id="output" contenteditable="false"></div> -->

        <div class="row">
          <div v-if="textButtons" class="d-md-flex justify-content-evenly">
            <button
              id="btn_copy"
              class="btn btn-primary my-2"
              @click="copyText()"
            >
              in Zwischenablage kopieren
              <svg
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-copy"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                />
              </svg>
            </button>
            <button
              id="btn_download"
              class="btn btn-success"
              @click="downloadFile()"
            >
              als Datei speichern
              <svg
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-download"
                viewBox="0 0 16 16"
              >
                <path
                  d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                />
                <path
                  d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                />
              </svg>
            </button>
          </div>
          <div>
            <button class="btn btn-dark" @click="darkmode()">
              <!--Moon stars fill icon-->
              <svg
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-moon-stars-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"
                />
                <path
                  d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"
                />
              </svg>
            </button>
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
          storage = allStorage();
          outputEdited = false;
          generatedTextRef.value.generateText(storage);
        }
      }
    } else {
      if (unref(generatedTextRef)) {
        storage = allStorage();
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
  const content = JSON.parse(localStorage.getItem("output")).status_text;
  // navigator.clipboard.writeText(content);
  try {
    navigator.clipboard.writeText(content);
    showSnackbarMessage("Text kopiert! ✅");
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

// Allows user to download the text as txt-file
function downloadFile() {
  const link = document.createElement("a");
  const content = JSON.parse(localStorage.getItem("output")).status_text;
  const file = new Blob([content], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  link.download = "documentation.txt";
  link.click();
  URL.revokeObjectURL(link.href);
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
