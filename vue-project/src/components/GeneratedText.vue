<template>
  <div id="text-output" @input="outputEdited">
    {{ output.status_text }}
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import persistToLocalStorage from "@/utils/persistToLocalStorage";

const props = defineProps({
  bmi: String,
});

// Define all events that can be emitted to parent components
const emit = defineEmits(["output-edited", "make-buttons-visible"]);

// const s = props.storage // save storage for better readability in the code below

const output = ref({ status_text: "" });
/* populate fields with stored data */
onMounted(() => {
  persistToLocalStorage(output, "output");
  if (output.value.status_text != "") {
    let text_output = document.querySelector("#text-output");
    text_output.setAttribute("contenteditable", true);
    emit("make-buttons-visible");
  }
});
/* use watch to retain inputted data via localStorage */
watch(
  output,
  () => {
    console.log("watcher triggered");
    localStorage.setItem("output", JSON.stringify(output.value));
  },
  { deep: true },
  { immediate: true }
);

// If the output is edited, update the text and emit the event to the parent to set outputEdited to false
const outputEdited = (e) => {
  output.value.status_text = e.target.textContent;
  emit("output-edited");
};

// Generates plain text with the inputted information
const generateText = (s) => {
  console.log("text generation started");

  //--------------------------------------------- BASIC INFO ----------------------------------------------------//
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

  //---------------------------------------- PSYCHOSTATUS -----------------------------------------------------//

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
  // If sys or dia is INcreased AND the other one is NOT DEcreased:
  if ((bp_sys > 140 || bp_dia > 90) && !(bp_sys < 100 || bp_dia < 60)) {
    bp_phrase = "erhöht";
    bp_no_rest = ", keine Ruheblutdruckmessung";
  }
  // If sys or dia is DEcreased AND the other one is NOT INcreased:
  else if ((bp_sys < 100 || bp_dia < 60) && !(bp_sys > 140 || bp_dia > 90)) {
    bp_phrase = "erniedrigt";
  } else if (bp_sys > 140 && bp_dia < 60) {
    bp_phrase = "systolisch erhöht, diastolisch erniedrigt";
    bp_no_rest = ", keine Ruheblutdruckmessung";
  } else if (bp_dia > 90 && bp_sys < 100) {
    bp_phrase = "diastolisch erhöht, systolisch erniedrigt";
    bp_no_rest = ", keine Ruheblutdruckmessung";
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

  // Heart insufficiency
  let heartinsuff_phrase = "";
  if (s.cardio.heartinsuff_signs == false) {
    heartinsuff_phrase = "Zeichen einer Herzschwäche fallen nicht auf.";
  }

  // Cardiac Devices TODO:
  let card_devices_phrase = "";
  if (s.cardio.devices == "vorhanden") {
    card_devices_phrase = `Folgende kardiale Geräte sind bei ${phrases[4]} vorhanden: `;
  }

  const status_vitals = `\nDer Blutdruck ist ${bp_phrase} (${bp_sys}/${bp_dia} mmHg, Normbereich 100–140/60–90 mmHg${bp_no_rest}), \
        der Puls ${pulse_phrase} (Pulsfrequenz ${pulse} Schläge/min, Normbereich 60–100 Schläge/min). \
        ${heart_auscultation_phrase} ${heartinsuff_phrase} \
        ${carotis_phrase} \
        ${card_devices_phrase}
        Über allen Lungenfeldern können vesikuläre Atemgeräusche ohne Nebengeräusche auskultiert werden. Palpatorisch ist die Leber nicht vergrössert und nicht druckschmerzhaft. \
        In der Kratzauskultation ragt die Leber in der Medioklavikularlinie bis etwa _ cm unter den Rippenbogen. `;

  //------------------------------------- VISION -----------------------------------------------//
  let pupils = s.vision.pupils;
  let vis_uncorr_re = s.vision.uncorr_re;
  let vis_uncorr_li = s.vision.uncorr_li;
  let vis_corr_re = s.vision.corr_re;
  let vis_corr_li = s.vision.corr_li;

  // Checks visual field
  let vis_field_phrase =
    " In der fingerperimetrischen Prüfung des Gesichtsfeldes fallen keine Ausfälle auf, die horizontale Ausdehnung ist grösser-gleich ";
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
    if (vision_aid === "brille") {
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
        Die Pupillen sind seitengleich, messen ca. ${pupils} mm im Durchmesser und reagieren direkt und konsensuell prompt auf Lichtreize. \
        Die Augenbeweglichkeit ist${eye_motiliy_phrase}${nystag_phrase}. \
        Der Visus beträgt unkorrigiert rechts ${vis_uncorr_re} und links ${vis_uncorr_li}${vision_corr_phrase}. \
        ${lang_test_phrase} ${vis_field_phrase}`;

  //----------------------------- HEARING ------------------------------------------//
  const status_hearing = ` Eine Einschränkung des Hörvermögens fällt im Gespräch nicht auf.`; // TODO add weber rinne phrase

  //----------------------------- NEUROLOGY ----------------------------------------//
  // Sense of vibration
  let vibration_phrase = "";
  let vib_wrist = "";
  let vib_wrist_re = s.neuro.vibration.wrist_re;
  let vib_wrist_li = s.neuro.vibration.wrist_li;
  let vib_ankle_re = s.neuro.vibration.ankle_re;
  let vib_ankle_li = s.neuro.vibration.ankle_li;
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
  if (bigtoe === "erhalten") {
    vibration_phrase += " Der Lagesinn der Grosszehen ist beidseits erhalten.";
  } else if (bigtoe === "nicht_erhalten") {
    vibration_phrase += " Der Lagesinn der Grosszehen ist nicht erhalten.";
  }

  // Reflexes [0: nicht geprüft; 1: -;2: +; 3: ++; 4: +++]
  let asr = s.neuro.reflexes.asr; // achilles heel
  let psr = s.neuro.reflexes.psr; // patella
  let bsr = s.neuro.reflexes.bsr; // biceps
  let tsr = s.neuro.reflexes.tsr; // triceps
  let max_lower = Math.max(psr, asr);
  let max_upper = Math.max(bsr, tsr);
  let reflexes = [asr, psr, bsr, tsr];

  let reflexes_phrase = "Die geprüften Muskelreflexe sind ";
  if (max_lower >= 3 && max_upper >= 3) {
    reflexes_phrase +=
      "an den oberen und unteren Extremitäten symmetrisch lebhaft auslösbar.";
  } else if (max_lower == 2 && max_upper == 2) {
    reflexes_phrase +=
      "an den oberen und unteren Extremitäten seitengleich schwach auslösbar.";
  } else if (max_lower == 1 && max_upper == 1) {
    reflexes_phrase += `an den oberen und unteren Extremitäten trotz Bahnungsversuchen nicht auslösbar (Anspannung ${phrases[4]}?).`;
  } else {
    // check upper extremities
    if (bsr >= 1 || tsr >= 1) {
      reflexes_phrase += "an den oberen Extremitäten ";
      if (bsr <= 1 && tsr <= 1) {
        reflexes_phrase += `trotz Bahnungsversuchen nicht (Anspannung ${phrases[4]}?)`;
      } else if (max_upper == 2) {
        reflexes_phrase += "seitengleich schwach";
      } else if (max_upper >= 3) {
        reflexes_phrase += "seitengleich lebhaft";
      }
    }
    // check lower extremities
    if (psr >= 1 || asr >= 1) {
      reflexes_phrase += ", an den unteren Extremitäten ";
      if (psr <= 1 && asr <= 1) {
        reflexes_phrase += `trotz Bahnungsversuchen nicht (Anspannung ${phrases[4]}?)`;
      } else if (max_lower == 2) {
        reflexes_phrase += "seitengleich schwach";
      } else if (max_lower >= 3) {
        reflexes_phrase += "seitengleich lebhaft";
      }
    }
    reflexes_phrase += " auslösbar";
  }

  // If only one reflex not triggerable:
  if (reflexes.filter((x) => x === "1").length === 1) {
    const reflex_names = {
      asr: "Achillesehnenreflex",
      psr: "Patellarsehnenreflex",
      bsr: "Bicepssehnenreflex",
      tsr: "Tricepssehnenreflex",
    };
    let reflex_is = "";
    if (asr == 1) {
      reflex_is = reflex_names["asr"];
    } else if (psr == 1) {
      reflex_is = reflex_names["psr"];
    } else if (bsr == 1) {
      reflex_is = reflex_names["bsr"];
    } else if (tsr == 1) {
      reflex_is = reflex_names["tsr"];
    }
    reflexes_phrase += `, mit Ausnahme des ${reflex_is}es, welcher trotz Bahnungsversuchen nicht auslösbar ist (Anspannung ${phrases[4]}?)`;
  }
  reflexes_phrase += ".";

  if (s.neuro.reflexes.asymm === true) {
    reflexes_phrase = "Die Muskeleigenreflexe sind asymmetrisch: " + s.neuro.reflexes.asymm_beschreibung;
  }

  // Unterberger
  let unterberger_test = s.neuro.unterberger.test;
  let unterberger_phrase = "";
  if (s.neuro.unterberger.abnorm === false) {
    if (unterberger_test === "sicher") {
      unterberger_phrase =
        "Der Unterberger-Tretversuch erfolgt sicher ohne Drehung.";
    }
    if (unterberger_test === "l_schwankend") {
      unterberger_phrase =
        "Der Unterberger-Tretversuch erfolgt leicht schwankend ohne Drehung.";
    }
    if (unterberger_test === "s_schwankend") {
      unterberger_phrase =
        "Der Unterberger-Tretversuch erfolgt stark schwankend ohne Drehung.";
    }
  } else if (s.neuro.unterberger.abnorm === true) {
    let rotation = s.neuro.unterberger.rotation_degrees;
    let steps = s.neuro.unterberger.rotation_steps;
    if (unterberger_test === "sicher") {
      unterberger_phrase = `Der Unterberger-Tretversuch erfolgt sicher mit ${rotation} Grad Drehung nach ${steps} Schritten.`;
    } else if (unterberger_test === "l_schwankend") {
      unterberger_phrase = `Der Unterberger-Tretversuch erfolgt leicht schwankend mit ${rotation} Grad Drehung nach ${steps} Schritten.`;
    } else if (unterberger_test === "s_schwankend") {
      unterberger_phrase = `Der Unterberger-Tretversuch erfolgt stark schwankend mit ${rotation} Grad Drehung nach ${steps} Schritten.`;
    }
  } else if (unterberger_test === "unmoeglich") {
    unterberger_phrase = "Der Unterberger-Tretversuch ist nicht durchführbar.";
  }

  // Romberg
  let romberg = s.neuro.romberg_test;
  let romberg_phrase = "";
  if (romberg === "sicher") {
    romberg_phrase =
      "Beim Romberg-Test kann keine Fallneigung und kein Schwanken festgestellt werden.";
  } else if (romberg === "l_schwankend") {
    unterberger_phrase = `Beim Romberg-Test kann eine Fallneigung mit leichtem Schwanken festgestellt werden..`;
  } else if (romberg === "s_schwankend") {
    unterberger_phrase = `Beim Romberg-Test kann eine Fallneigung mit starkem Schwanken festgestellt werden.`;
  } else if (romberg === "unmoeglich") {
    unterberger_phrase = "Der Romberg-Test ist nicht durchführbar.";
  }

  // Diadochokinese
  let diadochokinese_phrase = "";
  let diadocho = s.neuro.diadochokinesis;
  if (diadocho === "erhalten") {
    diadochokinese_phrase =
      "Die Diadochokinese der Hände ist flüssig und zügig.";
  } else if (diadocho === "disdiadochokinesis") {
    diadochokinese_phrase = "Die Diadochokinese der Hände ist beeinträchtigt.";
  } else if (diadocho === "bradydiadochokinesis") {
    diadochokinese_phrase =
      "Die Diadochokinese der Hände ist verlangsamt aber flüssig.";
  } else if (diadocho === "adiadochokinesis") {
    diadochokinese_phrase =
      "Die Diadochokinese der Hände ist vollständig aufgehoben.";
  }

  // Finger-Nase-Probe
  let fnp_phrase = "";
  let fnp = s.neuro.fnp;
  if (fnp === "sicher") {
    fnp_phrase = "Die Finger-Nase-Probe ist rasch und zielgenau.";
  } else if (fnp === "unpraezise") {
    fnp_phrase = "Die Finger-Nase-Probe ist unpräzise.";
  }

  // Tremor
  let tremor_phrase = "";
  let tremor = s.neuro.tremor;
  if (tremor === "not") {
    tremor_phrase = "Es ist kein Tremor feststellbar.";
  }
  // TODO: Schlägigkeit im Text abbilden
  else if (tremor === "present") {
    if (s.neuro.restingtremor) {
      tremor_phrase = "Es ist ein Ruhetremor feststellbar.";
    }
    if (s.neuro.intentiontremor) {
      tremor_phrase = "Es ist ein Intentionstremor feststellbar.";
    }
  }

  // Strichgang
  let linewalk_phrase = "";
  let linewalk = s.neuro.line_walk;
  if (linewalk === "sicher") {
    linewalk_phrase = "Der Strichgang ist sicher und flüssig.";
  } else if (linewalk === "l_schwankend") {
    linewalk_phrase = "Der Strichgang ist leicht schwankend, aber flüssig.";
  } else if (linewalk === "s_schwankend") {
    linewalk_phrase = "Der Strichgang ist stark schwankend, aber flüssig.";
  } else if (linewalk === "unmoeglich") {
    linewalk_phrase = "Der Strichgang ist nicht möglich.";
  }
  // Gang TODO: remove trailing commas
  let gait_phrase = "";
  let gait = s.neuro.gait;
  if (gait.abnorm == "unauffaellig") {
    gait_phrase = "Es ist kein pathologisches Gangmuster erkennbar.";
  } else if (gait.abnorm == "auffaellig") {
    let gait_items = "";
    if (gait.schwankend == true) {
      gait_items += "schwankend, ";
    }
    if (gait.kleinschrittig == true) {
      gait_items += "kleinschrittig, ";
    }
    if (gait.trendelenburg == true) {
      gait_items += "Trendelenburg-Hinken, ";
    }
    if (gait.steppergang == true) {
      gait_items += "Steppergang, ";
    }
    if (gait.ataktisch == true) {
      gait_items += "ataktisch, ";
    }
    if (gait.spastisch == true) {
      gait_items += "spastisch, ";
    }
    if (gait.wernicke_mann == true) {
      gait_items += "Wernicke-Mann-Gang, ";
    }
    gait_phrase = `Der Gang ist folgendermassen auffällig: ${gait_items}.`;
  }

  const status_neurology = ` Sensibilität und geprüfte Motorik (grobe Kraft) weisen keine verkehrsrelevanten funktionellen Defizite auf. \
        ${vibration_phrase} \
        ${reflexes_phrase} \
        ${unterberger_phrase} \
        ${romberg_phrase} \
        ${diadochokinese_phrase} ${fnp_phrase} ${tremor_phrase}\
        ${linewalk_phrase} ${gait_phrase} `;

  //----------------------------- MOBILITY --------------------------------------------------//
  let mobility_phrase = "";
  let spine = s.mobility.spine_movement;
  let extremities = s.mobility.extremities;
  if (spine == "moeglich" && extremities == "nicht_eingeschraenkt") {
    mobility_phrase =
      "Der Bewegungsumfang der Hals- und Brustwirbelsäule ist nicht eingeschränkt, ebenso zeigt der übrige Bewegungsapparat \
        keine verkehrsrelevanten Einschränkungen.";
  } else if (spine == "nicht_moeglich") {
    mobility_phrase =
      "Der Bewegungsumfang der Wirbelsäule im Brust- und Halsbereich ist eingeschränkt (Kopfdrehung < 45° links/rechts / Oberkörperdrehung < 90° links/rechts).";
    if (extremities == "eingeschränkt") {
      mobility_phrase +=
        "Der Bewegungsapparat zeigt verkehrsrelevante Einschränkungen.";
    }
  }

  const status_mobility = `${mobility_phrase} `;

  //----------------------------- SUBSTANCE --------------------------------------------------//

  let stigmata_phrase =
    "Es finden sich keine Alkohol- und/oder Drogenstigmata.";
  let stigmata_found = false;
  stigmata_found = searchStigmata();
  function searchStigmata() {
    for (let x in s.substance) {
      if (x.value == "Ja") {
        return true;
      }
    }
  }
  // TODO: generate list of found stigmata AND add if liver is palpable
  if (stigmata_found) {
    stigmata_phrase =
      "Folgende Alkohol- und/oder Drogenstigmata sind feststellbar: AUFFÜHREN";
  }

  const status_stigmata = `${stigmata_phrase}`;

  //----------------------------- NOTICEABLE FINDINGS ----------------------------------------//

  // Merge all text
  output.value.status_text =
    status_einleitung +
    status_psychostatus +
    status_vitals +
    status_vision +
    status_hearing +
    status_neurology +
    status_mobility +
    status_stigmata;

  emit("make-buttons-visible");

  let text_output = document.querySelector("#text-output");
  text_output.setAttribute("contenteditable", true);
  text_output.scrollIntoView({ behavior: "smooth" });
};
// defineExpose() in <script setup> is same as expose() in setup()
defineExpose({
  generateText,
});
</script>

<style scoped>
#text-output:hover,
#text-output:focus {
  background-color: white;
}
#text-output {
  margin-right: 2.5rem;
  max-width: 80rem;
  text-align: justify;
  transition: all 200ms ease-in-out;
}
</style>
