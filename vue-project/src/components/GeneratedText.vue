<template>
  <div id="output" @input="outputEdited">
    {{ status_text }}
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";

const props = defineProps({
  bmi: String,
});

// Define all events that can be emitted to parent components
const emit = defineEmits(['output-edited'])

// const s = props.storage // save storage for better readability in the code below

const status_text = ref("");
/* populate fields with stored data */
onMounted(() => persistToLocalStorage(status_text, "status_text"));
/* use watch to retain inputted data via localStorage */
watch(
  status_text,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("status_text", JSON.stringify(status_text.value));
  },
  { deep: true },
  { immediate: true }
);

// If the output is edited, update the text and emit the event to the parent to set outputEdited to false
const outputEdited = (e) => {
  status_text.value = e.target.textContent
  emit('output-edited')
}


// Generates plain text with the inputted information
const generateText = (s) => {
  console.log("text generation started");

  /* 
  // Checks if Weber- & Rinne performed
  let weber_rinne_phrase = "";
 // TODO
  if (cb_weber_rinne === true) {
    weber_rinne_phrase =
      " Der Weber-Test ist zentriert, der Rinne-Test positiv (Gehörprüfungen).";
  } */

  //----------------------------- BASIC INFO -------------------------------------//
  let age = s.basic.age;
  let height = s.vitals.height;
  let weight = s.vitals.weight;
  let height_m = s.vitals.height_measured;
  let weight_m = s.vitals.weight_measured;

  // Checks BMI
  let bmi_phrase = "normalem";
  if (props.bmi > 25) {
    bmi_phrase = "übergewichtigem";
  }
  if (props.bmi < 18.5) {
    bmi_phrase = "untergewichtigem";
  }
  let height_measured_phrase = "";
  let weight_measured_phrase = "";
  const m_phrases = [
    "ein",
    "alter",
    "Mann",
    "der Explorand",
    "des Exploranden",
  ];
  const f_phrases = [
    "eine",
    "alte",
    "Frau",
    "die Explorandin",
    "der Explorandin",
  ];
  let phrases = "";
  // Checks value from radio button to use corresponding gendering
  if (s.basic.gender == "m") {
    phrases = m_phrases;
  } else {
    phrases = f_phrases;
  }
  // Checks if weight & height were measured
  if (height_m === true && weight_m === true) {
    height_measured_phrase = "";
    weight_measured_phrase = "(gemessen mit Bekleidung, ohne Schuhe)";
  } else if (height_m === true && weight_m !== true) {
    height_measured_phrase = "(gemessen mit Bekleidung, ohne Schuhe)";
    weight_measured_phrase = `(Angabe ${phrases[4]})`;
  } else if (height_m !== true && weight_m === true) {
    height_measured_phrase = `(Angabe ${phrases[4]})`;
    weight_measured_phrase = "(gemessen mit Bekleidung, ohne Schuhe)";
  } else {
    height_measured_phrase = "";
    weight_measured_phrase = `(Angaben ${phrases[4]})`;
  }
  // Checks general condition
  let az_phrase = "gutem";
  if (s.vitals.az == "reduziert") {
    az_phrase = "reduziertem";
  }

  const status_einleitung = `Bei der körperlichen Untersuchung zeigt sich ${phrases[0]} zum Begutachtungszeitpunkt ${age} Jahre\
         ${phrases[1]} ${phrases[2]} in ${az_phrase} Allgemein- und ${bmi_phrase} Ernährungszustand. Körpergrösse ca. ${height} cm ${height_measured_phrase}, Körpergewicht \
         ca. ${weight} kg ${weight_measured_phrase}. `;

  //----------------------------- PSYCHOSTATUS -----------------------------------//

  const status_psychostatus = `Das Bewusstsein ist klar, die Orientierung in allen vier Qualitäten erhalten. \
        Auffassung und Konzentration erscheinen nicht vermindert. Der Gedankengang weist keine inhaltlichen und/oder formalen Störungen auf. \
        Es finden sich keine Hinweise auf ein psychotisches Erleben. Im Affekt ist ${phrases[3]} situationsadäquat und gut schwingungsfähig. \
        Antrieb und Psychomotorik sind nicht gestört.`;

  //----------------------------- CARDIOPULMONAL ---------------------------------//
  // Checks bloodpressure
  let bp_phrase = "nicht erhöht";
  let bp_no_rest = "";
  let bp_sys = s.vitals.bloodpressure_sys;
  let bp_dia = s.vitals.bloodpressure_dia;
  if (bp_sys > 140 || bp_dia > 90) {
    bp_phrase = "erhöht";
    bp_no_rest = ", keine Ruheblutdruckmessung";
  }
  if (bp_sys < 100 || bp_dia < 60) {
    bp_phrase = "erniedrigt";
  }

  //// Checks pulse
  // Checks pulse frequency
  let pulse_phrase = "";
  let pulse = s.vitals.pulse;
  let pulse_reg = s.vitals.pulse_reg;
  if (pulse > 100) {
    pulse_phrase = "beschleunigt und ";
  }
  if (pulse < 60) {
    pulse_phrase = "verlangsamt und ";
  }
  // Checks pulse regularity
  if (pulse_reg === true) {
    pulse_phrase += "regelmässig";
  } else {
    pulse_phrase += "unregelmässig [Schlagmuster beschreiben]";
  }

  // Heart auscultation
  let heart_auscultation_phrase = "";
  let auscultation = s.cardio.auscultation;
  if (auscultation == "normal") {
    heart_auscultation_phrase =
      "Bei der Auskultation des Herzens finden sich reine Herztöne und keine Herzgeräusche. ";
  }
  if (auscultation == "auffällig") {
    heart_auscultation_phrase =
      "Bei der Auskultation des Herzens findet sich [BESCHREIBEN] reine Herztöne und keine Herzgeräusche. ";
  }

  // Carotis
  let carotis_phrase = "";
  let carotis_sounds = s.cardio.carotids;
  if (carotis_sounds == "keine") {
    carotis_phrase =
      "Auskultatorisch werden über den Karotiden keine pathologischen Geräusche festgestellt.";
  }
  if (carotis_sounds == "vorhanden") {
    carotis_phrase =
      "Auskultatorisch werden über den Karotiden pathologische Geräusche festgestellt [BESCHREIBEN].";
  }

  const status_vitals = `\nDer Blutdruck ist ${bp_phrase} (${bp_sys}/${bp_dia} mmHg, Normbereich 100–140/60–90 mmHg${bp_no_rest}), \
        der Puls ${pulse_phrase} (Pulsfrequenz ${pulse} Schläge/min, Normbereich 60–100 Schläge/min). \
        ${heart_auscultation_phrase}Zeichen einer Herzschwäche fallen nicht auf. \
        ${carotis_phrase} \
        Über allen Lungenfeldern können vesikuläre Atemgeräusche ohne Nebengeräusche auskultiert werden. Palpatorisch ist die Leber nicht vergrössert und nicht druckschmerzhaft. \
        In der Kratzauskultation ragt die Leber in der Medioklavikularlinie bis etwa _ cm unter den Rippenbogen. `;

  //----------------------------- VISION ----------------------------------------//
  let pupil = s.vision.pupil;
  let vis_uncorr_re = s.vision.uncorr_re;
  let vis_uncorr_li = s.vision.uncorr_li;
  let vis_corr_re = s.vision.corr_re;
  let vis_corr_li = s.vision.corr_li;

  // Checks visual field
  let vis_field_phrase =
    " In der fingerperimetrischen Prüfung des Gesichtsfeldes fallen keine Ausfälle auf, die horizontale Ausdehnung ist ≥ ";
  let vis_field = s.vision.vis_field_degrees;
  if (vis_field == 120) {
    vis_field_phrase += "120°.";
  }
  if (vis_field == 140) {
    vis_field_phrase += "140°.";
  }
  if (vis_field == "nev") {
    vis_field_phrase =
      " Das Gesichtfeld ist in der fingerperimetrischen Prüfung nicht normal, die horizontale Ausdehnung beträgt < 120°.";
  }

  // Check if vision aid used
  let vision_corr_phrase = "";
  let vision_aid_type = "";
  let vision_aid_present = s.vision.aid_present;
  let vision_aid = s.vision.aid;
  if (vision_aid_present === true) {
    if (vision_aid == "Brille") {
      vision_aid_type = "eigener Brille";
    } else {
      vision_aid_type = "eigenen Kontaktlinsen";
    }
    vision_corr_phrase = `, korrigiert mit ${vision_aid_type} rechts ${vis_corr_re} und links ${vis_corr_li}`;
  }

  // Nystagmus
  let nystag_phrase = "";
  let nystag = s.vision.nystag;
  if (nystag == "nein") {
    nystag_phrase = ", ein Augenzittern (Nystagmus) nicht festzustellen";
  }
  if (nystag == "ja") {
    nystag_phrase =
      ", ein Augenzittern (Nystagmus) ist feststellbar [BESCHREIBEN]";
  }

  // Eye motility
  let eye_motiliy_phrase = " erhalten";
  let eye_motility = s.vision.eye_motility;
  if (eye_motility == "gestört") {
    eye_motiliy_phrase = " nicht erhalten [BESCHREIBEN]";
  }

  // Lang-Stereo-Test
  let lang_test_phrase = "";
  let stereo = s.vision.stereo;
  if (stereo == "positiv") {
    lang_test_phrase = "Der Lang-Stereotest II ist positiv.";
  }
  if (stereo == "negativ") {
    lang_test_phrase = "Der Lang-Stereotest II ist negativ.";
  }

  const status_vision = `Es liegt kein Herabhängen der Augenlider vor (Ptose). \
        Die Pupillen sind seitengleich, messen ca. ${pupil} mm im Durchmesser und reagieren direkt und konsensuell prompt auf Lichtreize. \
        Die Augenbeweglichkeit ist${eye_motiliy_phrase}${nystag_phrase}. \
        Der Visus beträgt unkorrigiert rechts ${vis_uncorr_re} und links ${vis_uncorr_li}${vision_corr_phrase}. \
        ${lang_test_phrase} ${vis_field_phrase}`;

  //----------------------------- HEARING ------------------------------------------//
  const status_hearing = ` Eine Einschränkung des Hörvermögens fällt im Gespräch nicht auf.`; // TODO add weber rinne phrase

  //----------------------------- NEUROLOGY ----------------------------------------//
  // Sense of vibration
  let vibration_phrase = "";
  let vib_wrist = "";
  let vib_wrist_re = s.neuro.vibration_wrist_re;
  let vib_wrist_li = s.neuro.vibration_wrist_li;
  let vib_ankle_re = s.neuro.vibration_ankle_re;
  let vib_ankle_li = s.neuro.vibration_ankle_li;
  let bigtoe = s.neuro.bigtoe;

  if (vib_wrist_re || vib_wrist_li) {
    if (vib_wrist_re == vib_wrist_li) {
      vib_wrist = `über beiden Daumengrundgelenken ${vib_wrist_re}/8 und `;
    } else {
      vib_wrist = `über dem Daumengrundgelenk rechts ${vib_wrist_re}/8 und links ${vib_wrist_li}/8 sowie `;
    }
  }
  if (vib_ankle_re || vib_ankle_li) {
    if (vib_ankle_re == vib_ankle_li) {
      vibration_phrase = `Der Vibrationssinn beträgt ${vib_wrist}über beiden Aussenknöcheln ${vib_ankle_re}/8.`;
    } else {
      vibration_phrase = `Der Vibrationssinn beträgt ${vib_wrist}über dem Aussenknöchel rechts ${vib_ankle_re}/8 und links ${vib_ankle_li}/8.`;
    }
  }
  if (bigtoe == "erhalten") {
    vibration_phrase += " Der Lagesinn der Grosszehen ist beidseits erhalten.";
  }
  if (bigtoe == "nicht erhalten") {
    vibration_phrase += " Der Lagesinn der Grosszehen ist nicht erhalten.";
  }

  const status_neurology = ` Sensibilität und geprüfte Motorik (grobe Kraft) weisen keine verkehrsrelevanten funktionellen Defizite auf. \
        ${vibration_phrase} \
        Die geprüften Muskelreflexe sind an den oberen Extremitäten seitengleich schwach, an den unteren Extremitäten symmetrisch lebhaft auslösbar. \
        Beim Unterberger-Tretversuch erfolgt keine Drehung. Beim Romberg-Test kann keine Fallneigung und kein Schwanken festgestellt werden. \
        Die Diadochokinese der Hände ist flüssig und zügig. Die Finger-Nase-Probe ist rasch und zielgenau. Es ist kein Tremor feststellbar. \
        Der Strichgang ist sicher und flüssig. Der Bewegungsumfang der Halswirbelsäule ist nicht eingeschränkt, ebenso zeigt der übrige Bewegungsapparat \
        keine verkehrsrelevanten Einschränkungen. `;

  //----------------------------- SUBSTANCE --------------------------------------------------//

  const status_stigmata = `Es finden sich keine Alkohol- und/oder Drogenstigmata.`;

  //----------------------------- NOTICEABLE FINDINGS ----------------------------------------//

  status_text.value =
    status_einleitung +
    status_psychostatus +
    status_vitals +
    status_vision +
    status_hearing +
    status_neurology +
    status_stigmata;

  let output = document.querySelector("#output");
  output.setAttribute("contenteditable", true);
  output.scrollIntoView({ behavior: "smooth" });
};
// defineExpose() in <script setup> is same as expose() in setup()
defineExpose({
  generateText,
});
</script>
