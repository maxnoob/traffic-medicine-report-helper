<template>
  <body>
    <div class="container" id="top_container">
      <div class="second_container">
        <div class="d-flex justify-content-between" style="margin-right: 2.5rem;">
          <h1>Status erfassen</h1>
          <button class="btn btn-dark my-3" @click="darkmode()">
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

        <NavBar />
        <!-- Basic Data / Stammdaten -->
        <div id="basic_data" class="offset" /> <!-- offset is so that the navbar won't cover the content that was scrolled to -->
        <BasicDataForm />
        <!---- Vitals  / Vitalparameter---->
        <div id="vitals" class="offset" />
        <VitalsForm ref="vitalsFormRef" />
        <!----- Vision / Sehvermögen ----->
        <div id="vision" class="offset" />
        <VisionForm />
        <div id="hearing" class="offset" />
        <HearingForm />
        <div id="substances" class="offset" />
        <SubstanceForm />
        <div id="psych" class="offset" />
        <Psych />
        <!-- Organisch bedingte Hirnleistungsstörungen -->
        <div id="kognition" class="offset" />
        <KognitionForm />
        <!----- Neurology / Neurologische Erkrankungen ----->
        <div id="neurology" class="offset" />
        <NeuroForm />
        <!----- Cardiopulmonal / Herz-Kreislauferkrankungen ----->
        <div id="cardio_pulmo" class="offset" />
        <CardioForm />
        <!----- Stoffwechselerkrankungen ----->
        <div id="metabo" class="offset" />
        <MetaboForm />
        <!----- Atem- und Bauchorganerkrankungen ----->
        <div id="airway_intestine" class="offset" />
        <AirwayIntenstineForm />
        <!----- Wirbelsäule und Bewegungsapparat ----->
        <div id="mobility" class="offset" />
        <MobilityForm />
        <!----- Buttons ----->
        <div class="center_horizontal">
        <div
          class="d-flex justify-content-evenly offset width-adj"
          id="processing"
        >
          <div>
            <button
              id="btn_text"
              class="btn cstm-blue my-3"
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
              class="btn cstm-red my-3"
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

        <div v-if="textButtons" class="d-flex justify-content-evenly width-adj">
          <div>
            <button
              id="btn_copy"
              class="btn cstm-green m-3"
              @click="copyText()"
            >
              in Zwischenablage kopieren
              <svg
                width="17"
                height="17"
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
          </div>
          <div>
            <button
              id="btn_download"
              class="btn cstm-green m-3"
              @click="downloadFile()"
            >
              Text-Datei speichern (nur generierter Text)
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-file-earmark-font"
                viewBox="0 0 16 16"
              >
                <path
                  d="M10.943 6H5.057L5 8h.5c.18-1.096.356-1.192 1.694-1.235l.293-.01v5.09c0 .47-.1.582-.898.655v.5H9.41v-.5c-.803-.073-.903-.184-.903-.654V6.755l.298.01c1.338.043 1.514.14 1.694 1.235h.5l-.057-2z"
                />
                <path
                  d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"
                />
              </svg>
            </button>
          </div>
          <div>
            <button
              id="btn_pdf"
              class="btn cstm-green m-3"
              @click="downloadPDF()"
            >
              PDF speichern (ganze Dokumentation)
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-file-earmark-pdf"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
                />
                <path
                  d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"
                />
              </svg>
            </button>
          </div>
        </div>
        <!-- snackbar for showing confirmation message after copying -->
        <Snackbar />
      </div>
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
import SubstanceForm from "./components/SubstanceForm.vue";
import Psych from "./components/Psych.vue";
import NavBar from "./components/NavBar.vue";

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
    SubstanceForm,
    HearingForm,
    Psych,
    NavBar,
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
import { onMounted, ref, unref } from "vue";
import { PDFDocument } from "pdf-lib";
// import { PDFLib } from "./libraries/pdf-lib@1.4.0/pdf-lib.min.js";
//import { download } from "./libraries/downloadjs@1.4.7/download.js";
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

onMounted(() => {
  /* let pdfScript = document.createElement("script");
  pdfScript.src = "./libraries/pdf-lib@1.4.0/pdf-lib.min.js";
  pdfScript.onload = () => {const { PDFDocument } = PDFLib;}
  document.head.appendChild(pdfScript);
  */
});

// download PDF
function downloadPDF() {
  const url = "/protokoll_vorlage.pdf";
  async function fillPDF() {
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    // load pdf
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    console.log("PDF loaded");
    // Get the form containing all the fields
    const form = pdfDoc.getForm();
    // get values from localStorage
    storage = allStorage();
    // Get all fields in the PDF by their names
    // page 1
    const basicDataField = form.getTextField(
      "PatientIn Nachname, Vorname, Geburtsdatum"
    );
    const pulseField = form.getTextField("Puls");
    const bloodpressureField = form.getTextField("Blutdruck");
    const heightField = form.getTextField("Grösse");
    const weightField = form.getTextField("Gewicht");
    const visus_re_scField = form.getTextField("OD sc");
    const visus_li_scField = form.getTextField("OS sc");
    const visus_re_ccField = form.getTextField("OD cc");
    const visus_li_ccField = form.getTextField("OS cc");
    const pupillenField = form.getTextField("PupillenDurchmesser");
    // page 2

    // page 3

    // page 4

    // Fill in the basic info fields
    basicDataField.setText(`geb. ${storage.basic.birthDate}`);
    if (storage.basic.medgroup == 1){
      form.getCheckBox('Gruppe 1').check()
    }
    else if (storage.basic.medgroup == 2){
      form.getCheckBox('Gruppe 2').check()
    }
    pulseField.setText(storage.vitals.pulse);
    bloodpressureField.setText(
      `${storage.vitals.bloodpressure_sys} / ${storage.vitals.bloodpressure_dia}`
    );
    heightField.setText(storage.vitals.height);
    weightField.setText(storage.vitals.weight);
    if (storage.vitals.az == 'erhalten'){
      form.getCheckBox('AZ erhalten').check()
    }
    else if (storage.vitals.az == 'reduziert'){
      form.getCheckBox('AZ reduziert').check()
    }

    if (storage.vision.aid == 'brille'){
      form.getCheckBox('Brille').check()
    }
    else if (storage.vision.aid == 'kontaktlinsen'){
      form.getCheckBox('Kontaktlinsen').check()
    }

    visus_re_scField.setText(storage.vision.uncorr_re + "");
    visus_li_scField.setText(storage.vision.uncorr_li + "");
    visus_re_ccField.setText(storage.vision.corr_re + "");
    visus_li_ccField.setText(storage.vision.corr_li + "");
    pupillenField.setText(storage.vision.pupils + "");

    // get current date and time, format it to append at end of filename
    const now = new Date();
    const { timeZone } = { timeZone: "Europe/Zurich" };
    const options = {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const { year, month, day, hour, minute } = new Intl.DateTimeFormat(
      "en-GB",
      options
    )
      .formatToParts(now)
      .reduce((acc, { type, value }) => ({ ...acc, [type]: value }), {});
    const dateTimeString = `${year}_${month}_${day}_${hour}${minute}`;

    // TODO: load font with unicode support since the standard font in pdf-lib are WinAnsi only!! otherwise encoding error for symbols like "greater or equal"
    // JSON from the localStorage to the PDF
    const jsonString = JSON.stringify(storage, null, "\t");
    try {
      JSON.parse(jsonString); // attempt to parse back to JSON to check for validity
      console.log("Valid JSON structure");
    } catch (error) {
      console.error("Invalid JSON structure:", error);
    }
    const jsonField = form.getTextField("JSON-Feld");
    jsonField.setText(jsonString + "\n" + dateTimeString + "\n");
    jsonField.setFontSize(9); // Set font size

    // add metadata to pdf
    pdfDoc.setProducer("LC1 Project TamFab @ BFH Medizininformatik");
    pdfDoc.setCreator("pdf-lib (https://github.com/Hopding/pdf-lib)");
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Trigger the browser to download the PDF document
    // eslint-disable-next-line no-undef
    require("downloadjs")(
      pdfBytes,
      `Untersuchungsprotokoll_${dateTimeString}.pdf`,
      "application/pdf"
    );
  }
  fillPDF();
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

/*
// Navbar logic
const navbar = ref(null);
const sticky = ref(0);
// Add sticky class to navbar when it's on top. Remove "sticky" when you leave the scroll position
const navbarStick = () => {
  if (window.scrollY >= sticky.value) {
    navbar.value.classList.add("sticky")
  } else if (navbar.value){
    navbar.value.classList.remove("sticky");
  }
};
onMounted( () => {
  navbar.value = $refs.navbar; // get navbar
  sticky.value = navbar.value.offsetTop; // get offset position of navbar
  window.addEventListener("scroll", navbarStick)
}
);*/
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

/* the offset is for the on-page navigation, so the navbar doesn't hide the content*/
.offset {
  padding-top: 50px; /* Adjust this value to your desired offset */
  margin-top: -50px; /* Counteract the added padding to maintain layout */
  position: relative; /* Ensure proper positioning */
}

html,
body {
  background: #f2fbff !important;
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
  padding-top: 30px;
  margin-left: 40px;
}

.cstm-blue {
  /* !important is needed to oversteer the bootstrap styling */
  background-color: #36749e !important;
  color: white !important;
  border-color: #36749e !important;
}
.cstm-blue:hover {
  background-color: #2c5f81 !important;
  border-color: #2c5f81 !important;
}

.cstm-red {
  /* !important is needed to oversteer the bootstrap styling */
  background-color: #c44b47 !important;
  color: white !important;
  border-color: #c44b47 !important;
}
.cstm-red:hover {
  background-color: #a7403c !important;
  border-color: #a7403c !important;
}

.cstm-green {
  /* !important is needed to oversteer the bootstrap styling */
  background-color: #278069 !important;
  color: white !important;
  border-color: #278069 !important;
}
.cstm-green:hover {
  background-color: #1e6250 !important;
  border-color: #1e6250 !important;
}

.width-adj {
  margin-right: 2.5rem;
  /*max-width: 80rem;*/
}

.center_horizontal {
   margin: auto !important;
   width: 50%;
   min-width: 55rem;
   max-width: 70rem;
}

</style>
