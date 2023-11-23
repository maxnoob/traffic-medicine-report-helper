<template>
  <div id="output">
    {{ status_text }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  bmi: String,
  storage: {}
});

defineExpose({
    generateText,
})

let outputEdited = false;
const status_text = ref("")

// Generates plain text with the inputted information
function generateText() {
  outputEdited = false;
  // Checks BMI
  let bmi_phrase = "normalem";
  if (props.bmi > 25) {
    bmi_phrase = "übergewichtigem";
  }
  if (props.bmi < 18.5) {
    bmi_phrase = "untergewichtigem";
  }
  let measured_phrase = "";
  const m_phrases = ["ein", "alter", "Mann", "der Explorand"];
  const f_phrases = ["eine", "alte", "Frau", "die Explorandin"];
  let phrases = "";
  // Checks value from radio button to use corresponding gendering
  if (props.storage.basic.gender == "m") {
    phrases = m_phrases;
    measured_phrase = "(Angaben des Exploranden)";
  } else {
    phrases = f_phrases;
    measured_phrase = "(Angaben der Explorandin)";
  }
  // Checks general condition
  let az_phrase = "gutem";
  if (props.storage.vitals.az == "reduziert") {
    az_phrase = "reduziertem";
  }
  // Checks if weight & height were measured
/*   if (input_dict.cb_measured === true) {
    measured_phrase = "(gemessen mit Bekleidung, ohne Schuhe)";
  } */

  // Checks bloodpressure
  let bp_phrase = "nicht erhöht";
  let bp_no_rest = "";
  if (input_dict.bp_sys_input > 140 || input_dict.bp_dia_input > 90) {
    bp_phrase = "erhöht";
    bp_no_rest = ", keine Ruheblutdruckmessung";
  }
  if (input_dict.bp_sys_input < 100 || input_dict.bp_dia_input < 60) {
    bp_phrase = "erniedrigt";
  }

  // Checks pulse
  let pulse_phrase = "";
  if (input_dict.pulse_input > 100) {
    pulse_phrase = "beschleunigt und ";
  }
  if (input_dict.pulse_input < 60) {
    pulse_phrase = "verlangsamt und ";
  }
  if (input_dict.cb_pulse_reg === true) {
    pulse_phrase += "regelmässig";
  } else {
    pulse_phrase += "unregelmässig [Schlagmuster beschreiben]";
  }

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
  if (input_dict.cb_vision_aid_present === true) {
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

  // const status_text_test =
  // `Es präsentiert sich ${phrases[0]} ${input_dict.age_input} Jahre ${phrases[1]} ${phrases[2]} in ${az_phrase} Allgemein- und ${bmi_phrase} Ernährungszustand.
  // Körpergrösse ${input_dict.height_input} cm, Gewicht ${input_dict.weight_input} kg ${measured_phrase}. Das Gesichtsfeld beträgt ≥ ${radio_buttons.vis_field}`;

  const status_einleitung = `Bei der körperlichen Untersuchung zeigt sich ${phrases[0]} zum Begutachtungszeitpunkt ${calculated_age} Jahre\
         ${phrases[1]} ${phrases[2]} in ${az_phrase} Allgemein- und ${bmi_phrase} Ernährungszustand. Körpergrösse ca. ${input_dict.height_input} cm, Körpergewicht \
         ca. ${input_dict.weight_input} kg ${measured_phrase}. `;

  const status_psychostatus = `Das Bewusstsein ist klar, die Orientierung in allen vier Qualitäten erhalten. \
        Auffassung und Konzentration erscheinen nicht vermindert. Der Gedankengang weist keine inhaltlichen und/oder formalen Störungen auf. \
        Es finden sich keine Hinweise auf ein psychotisches Erleben. Im Affekt ist ${phrases[3]} situationsadäquat und gut schwingungsfähig. \
        Antrieb und Psychomotorik sind nicht gestört.`;

  const status_vitals = `\nDer Blutdruck ist ${bp_phrase} (${input_dict.bp_sys_input} / ${input_dict.bp_dia_input} mmHg, Normbereich 100–140/60–90 mmHg${bp_no_rest}), \
        der Puls ${pulse_phrase} (Pulsfrequenz ${input_dict.pulse_input} Schläge/min, Normbereich 60–100 Schläge/min). \
        ${heart_auscultation_phrase}Zeichen einer Herzschwäche fallen nicht auf. \
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

  const status_stigmata = `Es finden sich keine Alkohol- und/oder Drogenstigmata.`;

  status_text.value = 
    status_einleitung +
    status_psychostatus +
    status_vitals +
    status_vision +
    status_hearing +
    status_neurology +
    status_stigmata;

    let output = document.querySelector("#output")
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
</script>
