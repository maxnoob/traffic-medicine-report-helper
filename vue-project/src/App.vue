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
        <BasicData />
        
        <!---- Vitals  / Vitalparameter---->
        <hr />
        <div class="row d-inline-flex">
          <VitalsForm />
        </div>

        <!----- Vision / Sehvermögen ----->
        <hr />
        <div class="row d-inline-flex">
          <VisionForm />
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
        <NeuroForm/>


        <!----- Cardiopulmonal ----->
        <hr />
        <KardioForm/>
        <MetaboForm/>
        <AirwayIntenstineForm/>
        <SpineMSForm/>
        
        <!-- TODO -->

        <hr />

        <!----- Kognition ----->
        <!-- <hr />
            <h4 class="py-2">Kognition</h4>  -->
        <!-- TODO -->

        <div class="row"></div>

        <button id="btn_values" class="btn btn-secondary my-3">
          Werte ausgeben
        </button>
        <button
          id="btn_text"
          class="btn btn-primary my-3"
          @click="text_btn_clicked()"
        >
          Text generieren
        </button>
        <button
          id="btn_clear"
          class="btn btn-danger my-3"
          @click="clear_btn_clicked()"
        >
          Werte löschen
        </button>

        <div id="output" contenteditable="false"></div>

        <div class="row">
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
          <button id="btn_download" class="btn btn-success" @click="darkmode()">
            darkmode
          </button>
        </div>

        <!-- snackbar for showing confirmation message after copying -->
        <Snackbar />
      </div>
    </div>
    <img src="./assets/BFH_Logo_deutsch.png" alt="BFH Logo" style="max-width: 50px;  height: auto; display: -webkit-box; margin-left: auto;"/>
  </body>
</template>

<script>
import VitalsForm from "./components/VitalsForm.vue";
import BasicData from "./components/BasicData.vue";
import Snackbar from "./components/Snackbar.vue";
import VisionForm from "./components/VisionForm.vue";
import NeuroForm from "./components/NeuroForm.vue";
import KardioForm from "./components/KardioForm.vue";
import MetaboForm from "./components/MetaboForm.vue";
import AirwayIntenstineForm from "./components/AirwayIntenstineForm.vue";
import SpineMSForm from "./components/SpineMSForm.vue";


export default {
  name: "App",
  components: {
    BasicData,
    VitalsForm,
    VisionForm,
    NeuroForm,
    Snackbar,
    KardioForm,
    MetaboForm,
    AirwayIntenstineForm,
    SpineMSForm
  },
  methods: {
    triggerSnackbar() {
      console.log("snackbar button clicked");
      this.$emit("triggerSnackbar");
    },
    saveValue() {
      console.log("change/keyup event triggered");
      var id = this.id; // get the sender's id to save it
      let val = "";
      if (this.type == "radio") {
        val = this.checked; // get status of current radio button
        let radio_group = this.name;
        var ele = document.getElementsByName(radio_group); // get all radio buttons from that group
        for (let i = 0; i < ele.length; i++) {
          if (ele[i] != this) {
            // unchecks all other radio buttons in localStorage of same group
            ele[i].checked = false;
            localStorage.setItem(ele[i].id, false);
          }
        }
      } else if (this.type == "checkbox") {
        val = this.checked; // get status of current radio button
      } else if (id == "output") {
        val = this.innerText; // to store the generated text
      } else {
        val = this.value; // get the value
      }
      console.log(val);
      localStorage.setItem(id, val); // Every time user writing something, the localStorage's value will override
    },
    // --------------------------------- Deleting user input -------------------------------------
    clear_btn_clicked() {
      if (
        confirm(
          'Alle erfassten Werte sicher löschen? \nKlicke auf "Abbrechen" um die Werte zu behalten. \nKlicke auf "OK" um alle erfassten Werte zu löschen.'
        )
      ) {
        //clearInputFields(); is this method really necessary??
        localStorage.clear();
        location.reload(); // reloads the page the get the default checked boxes
      }
    },
    // Delete values in input fields and unchecks radio buttons
    clearInputFields() {
      var ele = document.getElementsByTagName("input");
      for (let i = 0; i < ele.length; i++) {
        if (ele[i].type == "radio" || ele[i].type == "checkbox") {
          ele[i].checked = false;
        } else {
          document.getElementById(ele[i].id).value = "";
        }
      }
      localStorage.clear(); // Deletes all data local storage
      document.querySelector("#output").innerText = ""; // Deletes generated text
      document.querySelector("#btn_download").style.display = "none"; // Hides download button
      document.querySelector("#btn_copy").style.display = "none"; // Hides copy button
    },
  },
};
</script>

<script setup>
// ---------------------------------- Generate text ------------------------------------------------------
let outputEdited = false;
// Handles text button logic; catches if user previously did changes to generated text
function text_btn_clicked() {
  if (inputValidation()) {
    if (outputEdited == true) {
      if (
        confirm(
          'Der Text wurde bearbeitet. Wirklich neuen Text generieren?\n\nKlicke auf "OK" um den Text neu zu generieren. Änderungen gehen verloren.\nKlicke auf "Abbrechen" um den geänderten Text zu behalten.'
        )
      ) {
        generateText();
      }
    } else {
      generateText();
    }
  }
}

// Checks if one of the radio buttons of a group is checked
function inputValidation() {
  let basic = JSON.parse(localStorage.getItem("basic"));
  console.log("gender " + basic.gender);
  if (basic.gender !== "m" && basic.gender !== "f") {
    alert("Geschlecht auswählen");
    return false;
  }
  return true;
}

function allStorage() {
  let values = {};
  const keys = Object.keys(localStorage);
  for (let i in keys) {
    console.log(keys[i]);
    values[keys[i]] = JSON.parse(localStorage.getItem(keys[i]));
  }
  return values;
}

// Calculate BMI
function calcBMI(weight, height) {
  let bmi = (weight / (height / 100) ** 2).toPrecision(3);
  return bmi;
}

// Generates plain text with the inputted information
function generateText() {
  outputEdited = false;
  const storage = allStorage(); // retrieves all json in localStorage. can be accessed e.g. via "storage.basic.gender".

  // Checks BMI
  let bmi_phrase = "normalem";
  let bmi = calcBMI(storage.vitals.weight, storage.vitals.height);
  storage.vitals.bmi;
  console.log(bmi);
  if (bmi > 25) {
    bmi_phrase = "übergewichtigem";
  }
  if (bmi < 18.5) {
    bmi_phrase = "untergewichtigem";
  }
  let measured_phrase = "";
  const m_phrases = ["ein", "alter", "Mann", "der Explorand"];
  const f_phrases = ["eine", "alte", "Frau", "die Explorandin"];
  let phrases = "";
  // Checks value from radio button to use corresponding gendering
  console.log("THIS ONE: " + storage.basic.gender);
  if (storage.basic.gender == "m") {
    phrases = m_phrases;
    measured_phrase = "(Angaben des Exploranden)";
  } else {
    phrases = f_phrases;
    measured_phrase = "(Angaben der Explorandin)";
  }
  // Checks general condition
  let az_phrase = "gutem";
  console.log(storage.az);
  if (storage.vitals.az == "reduziert") {
    az_phrase = "reduziertem";
  }
  // Checks if weight & height were measured
  /*   if (input_dict.cb_measured === true) {
    measured_phrase = "(gemessen mit Bekleidung, ohne Schuhe)";
  } */

  // Checks bloodpressure
  let bp_phrase = "nicht erhöht";
  let bp_no_rest = "";
  if (
    storage.vitals.bloodpressure_sys > 140 ||
    storage.vitals.bloodpressure_dia > 90
  ) {
    bp_phrase = "erhöht";
    bp_no_rest = ", keine Ruheblutdruckmessung";
  }
  if (
    storage.vitals.bloodpressure_sys < 100 ||
    storage.vitals.bloodpressure_dia < 60
  ) {
    bp_phrase = "erniedrigt";
  }

  // Checks pulse
  let pulse_phrase = "";
  if (storage.vitals.pulse > 100) {
    pulse_phrase = "beschleunigt und ";
  }
  if (storage.vitals.pulse < 60) {
    pulse_phrase = "verlangsamt und ";
  }
  if (storage.vitals.pulse_reg === true) {
    pulse_phrase += "regelmässig";
  } else {
    pulse_phrase += "unregelmässig [Schlagmuster beschreiben]";
  }

  /*
  // Checks visual field
  let vis_field_phrase =
    " In der fingerperimetrischen Prüfung des Gesichtsfeldes fallen keine Ausfälle auf, die horizontale Ausdehnung ist ≥ ";
  if (radio_buttons.vis_field == 120) {
    vis_field_phrase += "120°.";
  }
  if (radio_buttons.vis_field == 140) {
    vis_field_phrase += "140°.";
  }
  if (radio_buttons.vis_field == "nev") {
    vis_field_phrase =
      " Das Gesichtfeld ist in der fingerperimetrischen Prüfung nicht normal, die horizontale Ausdehnung beträgt < 120°.";
  }

  // Check if vision aid used
  let vision_corr_phrase = "";
  let vision_aid_type = "";
  if (storage.vision.aid_present === true) {
    if (radio_buttons.vision_aid == "Brille") {
      vision_aid_type = "eigener Brille";
    } else {
      vision_aid_type = "eigenen Kontaktlinsen";
    }
    vision_corr_phrase = `, korrigiert mit ${vision_aid_type} rechts ${input_dict.vis_corr_re_input} und links ${input_dict.vis_corr_li_input}`;
  }

  // Nystagmus
  let nystag_phrase = "";
  if (radio_buttons.nystag == "nein") {
    nystag_phrase = ", ein Augenzittern (Nystagmus) nicht festzustellen";
  }
  if (radio_buttons.nystag == "ja") {
    nystag_phrase =
      ", ein Augenzittern (Nystagmus) ist feststellbar [BESCHREIBEN]";
  }

  // Eye motility
  let eye_motiliy_phrase = " erhalten";
  if (radio_buttons.eye_motility == "gestört") {
    eye_motiliy_phrase = " nicht erhalten [BESCHREIBEN]";
  }

  // Lang-Stereo-Test
  let lang_test_phrase = "";
  if (radio_buttons.lang_stereo == "positiv") {
    lang_test_phrase = "Der Lang-Stereotest II ist positiv.";
  }
  if (radio_buttons.lang_stereo == "negativ") {
    lang_test_phrase = "Der Lang-Stereotest II ist negativ.";
  }

  // Checks if Weber- & Rinne performed
  let weber_rinne_phrase = "";
  if (input_dict.cb_weber_rinne === true) {
    weber_rinne_phrase =
      " Der Weber-Test ist zentriert, der Rinne-Test positiv (Gehörprüfungen).";
  }

  // Heart auscultation
  let heart_auscultation_phrase = "";
  if (radio_buttons.heart_auscultation == "normal") {
    heart_auscultation_phrase =
      "Bei der Auskultation des Herzens finden sich reine Herztöne und keine Herzgeräusche. ";
  }
  if (radio_buttons.heart_auscultation == "auffällig") {
    heart_auscultation_phrase =
      "Bei der Auskultation des Herzens findet sich [BESCHREIBEN] reine Herztöne und keine Herzgeräusche. ";
  }

  // Carotis
  let carotis_phrase = "";
  if (radio_buttons.carotis == "keine") {
    carotis_phrase =
      "Auskultatorisch werden über den Karotiden keine pathologischen Geräusche festgestellt.";
  }
  if (radio_buttons.carotis == "vorhanden") {
    carotis_phrase =
      "Auskultatorisch werden über den Karotiden pathologische Geräusche festgestellt [BESCHREIBEN].";
  }

  */

  const status_einleitung = `Bei der körperlichen Untersuchung zeigt sich ${phrases[0]} zum Begutachtungszeitpunkt ${storage.basic.age} Jahre\
         ${phrases[1]} ${phrases[2]} in ${az_phrase} Allgemein- und ${bmi_phrase} Ernährungszustand. Körpergrösse ca. ${storage.vitals.height} cm, Körpergewicht \
         ca. ${storage.vitals.weight} kg ${measured_phrase}. `;

  const status_psychostatus = `Das Bewusstsein ist klar, die Orientierung in allen vier Qualitäten erhalten. \
        Auffassung und Konzentration erscheinen nicht vermindert. Der Gedankengang weist keine inhaltlichen und/oder formalen Störungen auf. \
        Es finden sich keine Hinweise auf ein psychotisches Erleben. Im Affekt ist ${phrases[3]} situationsadäquat und gut schwingungsfähig. \
        Antrieb und Psychomotorik sind nicht gestört.`;

  const status_vitals = `\nDer Blutdruck ist ${bp_phrase} (${storage.vitals.bloodpressure_sys}/${storage.vitals.bloodpressure_dia} mmHg, Normbereich 100–140/60–90 mmHg${bp_no_rest}), \
        der Puls ${pulse_phrase} (Pulsfrequenz ${storage.vitals.pulse} Schläge/min, Normbereich 60–100 Schläge/min).`; // \
  /*${heart_auscultation_phrase}Zeichen einer Herzschwäche fallen nicht auf. \
        ${carotis_phrase} \
        Über allen Lungenfeldern können vesikuläre Atemgeräusche ohne Nebengeräusche auskultiert werden. Palpatorisch ist die Leber nicht vergrössert und nicht druckschmerzhaft. \
        In der Kratzauskultation ragt die Leber in der Medioklavikularlinie bis etwa ${input_dict.liver_input} cm unter den Rippenbogen. `;

  const status_vision = `Es liegt kein Herabhängen der Augenlider vor (Ptose). \
        Die Pupillen sind seitengleich, messen ca. ${input_dict.pupil_input} mm im Durchmesser und reagieren direkt und konsensuell prompt auf Lichtreize. \
        Die Augenbeweglichkeit ist${eye_motiliy_phrase}${nystag_phrase}. \
        Der Visus beträgt unkorrigiert rechts ${input_dict.vis_uncorr_re_input} und links ${input_dict.vis_uncorr_li_input}${vision_corr_phrase}. \
        ${lang_test_phrase} ${vis_field_phrase}`;

  const status_hearing = ` Eine Einschränkung des Hörvermögens fällt im Gespräch nicht auf.${weber_rinne_phrase}`;

  // Sense of vibration
  let vibration_phrase = "";
  let vib_thumb = "";
  if (input_dict.vib_thumb_re_input || input_dict.vib_thumb_li_input) {
    if (input_dict.vib_thumb_re_input == input_dict.vib_thumb_li_input) {
      vib_thumb = `über beiden Daumengrundgelenken ${input_dict.vib_thumb_re_input}/8 und `;
    } else {
      vib_thumb = `über dem Daumengrundgelenk rechts ${input_dict.vib_thumb_re_input}/8 und links ${input_dict.vib_thumb_li_input}/8 sowie `;
    }
  }
  if (input_dict.vib_ankle_re_input || input_dict.vib_ankle_li_input) {
    if (input_dict.vib_ankle_re_input == input_dict.vib_ankle_li_input) {
      vibration_phrase = `Der Vibrationssinn beträgt ${vib_thumb}über beiden Aussenknöcheln ${input_dict.vib_ankle_re_input}/8.`;
    } else {
      vibration_phrase = `Der Vibrationssinn beträgt ${vib_thumb}über dem Aussenknöchel rechts ${input_dict.vib_ankle_re_input}/8 und links ${input_dict.vib_ankle_li_input}/8.`;
    }
  }
  if (radio_buttons.bigtoe == "erhalten") {
    vibration_phrase += " Der Lagesinn der Grosszehen ist beidseits erhalten.";
  }
  if (radio_buttons.bigtoe == "nicht erhalten") {
    vibration_phrase += " Der Lagesinn der Grosszehen ist nicht erhalten.";
  }

  const status_neurology = ` Sensibilität und geprüfte Motorik (grobe Kraft) weisen keine verkehrsrelevanten funktionellen Defizite auf. \
        ${vibration_phrase} \
        Die geprüften Muskelreflexe sind an den oberen Extremitäten seitengleich schwach, an den unteren Extremitäten symmetrisch lebhaft auslösbar. \
        Beim Unterberger-Tretversuch erfolgt keine Drehung. Beim Romberg-Test kann keine Fallneigung und kein Schwanken festgestellt werden. \
        Die Diadochokinese der Hände ist flüssig und zügig. Die Finger-Nase-Probe ist rasch und zielgenau. Es ist kein Tremor feststellbar. \
        Der Strichgang ist sicher und flüssig. Der Bewegungsumfang der Halswirbelsäule ist nicht eingeschränkt, ebenso zeigt der übrige Bewegungsapparat \
        keine verkehrsrelevanten Einschränkungen. `;

  const status_stigmata = `Es finden sich keine Alkohol- und/oder Drogenstigmata.`; */

  const status_text = status_einleitung + status_psychostatus + status_vitals;
  /* status_vision +
    status_hearing +
    status_neurology +
    status_stigmata; */
  const output = document.querySelector("#output");
  output.innerText = status_text;
  output.setAttribute("contenteditable", true);
  output.addEventListener("keyup", function () {
    outputEdited = true;
  });
  const download_btn = document.querySelector("#btn_download");
  download_btn.style.display = "block";
  const copy_btn = document.querySelector("#btn_copy");
  copy_btn.style.display = "block";
  output.scrollIntoView({ behavior: "smooth" });
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
